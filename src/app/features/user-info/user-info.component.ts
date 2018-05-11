import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/api/user.service';
import { UserModelService } from '../../core/model/user-model.service';
import { QuestionsService } from '../../core/api/questions.service';
import { AppAPIService } from '../../core/util/app-api.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  private userInfo: any;
  private id_user;
  private email;
  private password;
  private password2;
  private oldpassword;
  private checkInfo = 0;
  private listPost = [];
  private imageProfile;
  private check_member;
  private check_follow = false;
  private check_change_password = true;
  private user_exist = false;
  constructor(private route: ActivatedRoute,
    private UserSevice: UserService,
    private UserModelService: UserModelService,
    private Router: Router,
    private user: UserService,
    private apiService: AppAPIService,
    private question: QuestionsService) {
    this.route.params
      .map(params => params['iduser'])
      .subscribe((id) => {
        this.id_user = id;
        if (this.UserModelService.getCookieUserInfo()) {
          let _id = this.UserModelService.getCookieUserInfo().id;
          this.user_exist = true;
          if (_id == this.id_user) {
            this.check_member = true;
          } else {
            this.check_member = false;
          }
        } else {
          this.check_member = false;
          this.user_exist = false;
        }
        this.getUserInfo(id);
        this.checkFollow(id);
        this.getListQuestion();
      });
  }

  checkFollow(id) {
    this.user.checkFollow(id).subscribe(data => {
      console.log("check-follow", data);
      this.check_follow = true;
    }, err => {
      this.check_follow = false;
      console.log("check-follow", err);
    })
  }

  getUserInfo(id) {
    this.UserSevice.getInfoUser(id).subscribe(data => {
      this.userInfo = data;
      console.log("[DetailComponent:ngOnInit] userinfo", data);
      this.getImageProfile(data.avatar);

      // for (var item in data) {
      //   if (!data[item]) {
      //     this.confirmUser();
      //     return;
      //   }
      // }

    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
  }

  getImageProfile(avatar) {
    // var url = this.ConfigService.getBaseURL();
    this.imageProfile = avatar;
  }

  confirmUser() {
    this.checkInfo = 1;
    this.setDefault();
  }

  checkUpdateUser() {

    if (this.oldpassword && this.password && this.password2) {
      if (this.password == this.password2) {
        this.updateUser();
      } else {
        this.check_change_password = false;
      }
    } else {
      this.check_change_password = false;
    }

  }

  updateUser() {
    var parmas = {
      oldPassword: this.oldpassword,
      newPassword: this.password,
      renewPassword: this.password2
    }
    console.log("updateUser", parmas);
    this.UserSevice.updateUser(parmas).subscribe(data => {
      console.log("updateUser", data);
      this.getUserInfo(this.userInfo.id);
      this.checkInfo = 0;
      this.check_change_password = true;
    }, err => {
      console.log(err);
      this.check_change_password = false;
    })
  }

  setDefault() {
    this.password = "";
    this.password2 = "";
    this.oldpassword = "";
  }

  cancel() {
    // this.demoInfo = this.userInfo;
    this.checkInfo = 0;
    // this.setDefault();
  }

  settingUser() {
    this.setDefault();
    this.checkInfo = 2;
  }

  getListQuestion(page?) {
    var params = {
      "page": page | 0,
      "size": "100",
      "sort": "-lastModified"
    }
    this.question.getWithIdUser(params, this.id_user).subscribe(data => {
      console.log("getListQuestion", data);
      this.listPost = data;
    }, err => {
      console.log("getListQuestion", err);
    })
  }

  deletePost(id) {
    this.question.delete(id).subscribe(data => {
      console.log("delete-question", data);
      this.getListQuestion();
    }, err => {
      console.log("delete-question", err);
    })
  }

  goToDetail(id) {
    this.Router.navigate(['/features/detail-post', {
      id: id
    }]);
  }

  edit(id) {
    this.Router.navigate(['/features/create-edit-question', {
      id: id
    }]);
  }

  follow() {
    this.user.follow(this.id_user).subscribe(data => {
      console.log("follow", data);
      this.check_follow = !this.check_follow;
    }, err => {
      console.log("follow", err);
    })
  }

  unfollow() {
    this.user.unfollow(this.id_user).subscribe(data => {
      console.log("unfollow", data);
      this.check_follow = !this.check_follow;
    }, err => {
      console.log("unfollow", err);
    })
  }

  changeImage(event) {
    var file = event.target.files[0];
    console.log(file);
    var token = this.UserModelService.usSession().token;
    this.apiService.uploadBlob(
      'api/users/changeProfile',
      file, {}, token).subscribe(
        data => {
          console.log('success', data);
          this.imageProfile = data.avatar;
        },
        (error) => {
          console.log("onSubmit error", error);
        }
      );
  }
}

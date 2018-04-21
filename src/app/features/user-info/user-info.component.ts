import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/api/user.service';
import { UserModelService } from '../../core/model/user-model.service';
import { QuestionsService } from '../../core/api/questions.service';
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
  constructor(private route: ActivatedRoute,
    private UserSevice: UserService,
    private UserModelService: UserModelService,
    private Router: Router,
    private user: UserService,
    private question: QuestionsService) {
    this.route.params
      .map(params => params['iduser'])
      .subscribe((id) => {
        this.id_user = id;

        let _id = this.UserModelService.getCookieUserInfo().id;
        if (_id == this.id_user) {
          this.check_member = true;
        } else {
          this.check_member = false;
        }
        this.getUserInfo(id);
        this.getListQuestion();

      });
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

  // changeImage(event) {
  //   var file = event.target.files[0];
  //   console.log(file);

  //   this.apiService.uploadBlob(
  //     'api/user/upload_profile',
  //     file,
  //     {
  //       token: this.UserModelService.usSession().accesskey,
  //       username: this.userInfo.username
  //     }).subscribe(
  //       data => {
  //         console.log('success');
  //         // this.getImageProfile();
  //       },
  //       (error) => {
  //         console.log("onSubmit error", error);
  //         // this.getImageProfile();
  //       }
  //     );
  // }

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
        ////
      }
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
    }, err => {
      console.log(err);
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
    }, err => {
      console.log("follow", err);
    })
  }

  unfollow() {
    this.question.unfollow(this.id_user).subscribe(data => {
      console.log("unfollow", data);
    }, err => {
      console.log("unfollow", err);
    })
  }
}

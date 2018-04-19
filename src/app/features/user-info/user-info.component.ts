import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/api/user.service';
import { Http } from '@angular/http';
import { HttpResponseService } from '../../core/util/http-response.service';
import { UserModelService } from '../../core/model/user-model.service';
import { AppAPIService } from '../../core/util/app-api.service';
import { LocalStorageService } from '../../core/util/local-storage.service';
import { ConfigService } from '../../core/config.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  private userInfo: any;
  private email;
  private password;
  private password2;
  private checkInfo = 0;
  private imageProfile;
  constructor(private route: ActivatedRoute,
    private UserSevice: UserService,
    private apiService: AppAPIService,
    private UserModelService: UserModelService,
    private storage: LocalStorageService,
    private ConfigService: ConfigService,
    private http: Http) {
    this.route.params
      .map(params => params['iduser'])
      .subscribe((id) => {
        this.getUserInfo(id);
      });
    let id = this.UserModelService.getCookieUserInfo().id;
    if (id) {
      this.getUserInfo(id);
    }
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

  changeImage(event) {
    var file = event.target.files[0];
    console.log(file);

    this.apiService.uploadBlob(
      'api/user/upload_profile',
      file,
      {
        token: this.UserModelService.usSession().accesskey,
        username: this.userInfo.username
      }).subscribe(
        data => {
          console.log('success');
          // this.getImageProfile();
        },
        (error) => {
          console.log("onSubmit error", error);
          // this.getImageProfile();
        }
      );
  }

  getImageProfile(avatar) {
    // var url = this.ConfigService.getBaseURL();
    this.imageProfile = avatar;
  }

  confirmUser() {
    this.checkInfo = 1;
    this.setDefault();
  }

  updateUser() {
    this.checkInfo = 0;
    var parmas = {
      id: this.userInfo.id,
      email: this.email,
    }
    if (this.password && this.password2) {
      if (this.password == this.password2) {
        parmas['password'] = this.password;
      } else {
        ////
      }
    }
    console.log("updateUser", parmas);
    this.UserSevice.updateUser(parmas).subscribe(data => {
      console.log("updateUser", data);
      this.getUserInfo(this.userInfo.id);
    }, err => {
      console.log(err);
    })
  }

  setDefault() {
    this.email = this.userInfo.email;
  }

  cancel() {
    // this.demoInfo = this.userInfo;
    this.checkInfo = 0;
    this.setDefault();
  }

  settingUser() {
    this.setDefault();
    this.checkInfo = 2;
  }
}

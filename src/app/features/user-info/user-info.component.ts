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
  private firstName;
  private middleName;
  private lastName;
  private birthday;
  private email;
  private nationality;
  private checkAllow = false;
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
    // // this.route.params
    //   .map(params => params['iduser'])
    //   .subscribe((id) => {
    //     this.getUserInfo(id);
    //   });
    // let id = this.UserModelService.getCookieUserInfo().id;
    // if (id) {
    //   this.getUserInfo(id);
    // }
  }

  getUserInfo(id) {
    this.UserSevice.getInfoUser(id).subscribe(data => {
      this.userInfo = data;
      console.log("[DetailComponent:ngOnInit] userinfo", data);
      this.getImageProfile();

      for (var item in data) {
        if (!data[item]) {
          this.confirmUser();
          return;
        }
      }

    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
  }

  changeImage(event) {
    var file = event.target.files[0];
    console.log(file);
    // this.UserSevice.upload_image(file, {
    //   token: this.UserModelService.usSession().accesskey,
    // }).subscribe(data => {
    //   console.log(data);
    // });
    // const formData: FormData = new FormData();
    // formData.append('file', file, file.name);
    // const headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // const body = JSON.stringify({ headers: headers });
    // this.http.post('http://localhost:3000/api/user/upload_profile', file,
    //   body)
    //   .map(res => res.json())
    //   .subscribe(
    //     data => console.log('success'),
    //     error => console.log(error)
    //   )


    this.apiService.uploadBlob(
      'api/user/upload_profile',
      file,
      {
        token: this.UserModelService.usSession().accesskey,
        username: this.userInfo.username
      }).subscribe(
        data => {
          console.log('success');
          this.getImageProfile();
        },
        (error) => {
          console.log("onSubmit error", error);
          this.getImageProfile();
        }
      );
  }

  getImageProfile() {
    // var url = this.ConfigService.getBaseURL();
    this.imageProfile = this.UserSevice.getImageProfile(this.userInfo.username);
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
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      birthday: this.birthday,
      nationality: this.nationality
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

  changeBirthday(event) {
    console.log("changeBirthday", event.target.value);
    this.birthday = event.target.value;
  }

  setDefault() {
    this.email = this.userInfo.email;
    this.firstName = this.userInfo.firstName;
    this.middleName = this.userInfo.middleName;
    this.lastName = this.userInfo.lastName;
    this.birthday = this.userInfo.birthday;
    this.nationality = this.userInfo.nationality;
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

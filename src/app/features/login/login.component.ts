import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/api/user.service';
import { Router } from '@angular/router';
import { UserModelService } from '../../core/model/user-model.service';
import { LocalStorageService } from '../../core/util/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: any;
  email: any;
  username: any;
  username2: any;
  password: any;
  password1: any;
  password2: any;
  checklogin = true;
  check = true;
  private registFail;
  private check2;
  private UserLoginData;
  constructor(private UserService: UserService,
    private userModel: UserModelService,
    private storage: LocalStorageService,
    private Router: Router) { }
  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    this.UserLoginData = this.userModel.getCookieUserInfo();
    console.log("UserLoginData", this.UserLoginData);
    if (this.UserLoginData)
      this.userModel.checkApi().subscribe(data => {
        console.log("checkApi", data);
        if (data.success) {
          this.Router.navigate(['/features', {
            iduser: this.userModel.getCookieUserInfo().id,
          }]);
        }
      }, err => {
        console.log("checkApi2", err);
      })
  }

  login() {
    this.Router.navigate(['/features', {
      // iduser: this.userModel.getCookieUserInfo().id,
    }], );
    // var params = {
    //   username: this.username,
    //   password: this.password
    // }
    // this.UserService.login(params).subscribe(
    //   data => {
    //     console.log(data);
    //     this.userModel.setCookieUserInfo(data);
    //     this.Router.navigate(['/features', {
    //       iduser: this.userModel.getCookieUserInfo().id,
    //     }], );
    //   },
    //   error => {
    //     this.check = false;
    //     console.log(error);
    //   }
    // );
  }

  resetRegist() {
    this.username2 = "";
    this.password1 = "";
    this.password2 = "";
  }

  regist() {
    if (this.username2 && this.password1 && this.password2) {
      if (this.password2 == this.password1) {
        var params = {
          username: this.username2,
          password: this.password2
        };
        this.UserService.regist(params).subscribe(
          data => {
            if (data.success) {
              console.log("regist", data);
              this.resetRegist();
              this.registFail = "";
              this.check2 = true;
            } else {
              this.registFail = data.message;
              this.check2 = false;
            }
          },
          error => {
            console.log(error);
            this.registFail = 'server fail';
            this.check2 = false;
          }
        );
      } else {
        this.registFail = 'confirm password fail';
        this.check2 = false;
      }
    } else {
      this.registFail = 'ele not null'
    }


  }
  change() {
    this.checklogin = !this.checklogin;
  }

  forgotPassword() {

  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/api/user.service';
import { Router } from '@angular/router';
import { UserModelService } from '../../core/model/user-model.service';
import { LocalStorageService } from '../../core/util/local-storage.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: any;
  email: any;
  fullname: any;
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
    private http: Http,
    private Router: Router) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `hello`);

    const options = new RequestOptions({ headers: headers });
    this.http.post(
      "http://localhost:8080/api/auth",
      { username: 'trongnguyen', password: '123456' },
      options
    ).subscribe();
  }
  ngOnInit() {
    // this.checkLogin(); 
    // this.login();
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
    // this.Router.navigate(['/features', {
    //   // iduser: this.userModel.getCookieUserInfo().id,
    // }], );

    var params = {
      username: this.username,
      password: this.password
    }

    console.log(params);
    this.UserService.login(params).subscribe(
      data => {
        console.log(data);
        this.userModel.setCookieUserInfo(data);
        this.Router.navigate(['/features/home', {
          iduser: this.userModel.getCookieUserInfo().id,
        }], );
      },
      error => {
        this.check = false;
        console.log(error);
      }
    );
  }

  resetRegist() {
    this.email = "";
    this.fullname = "";
    this.username2 = "";
    this.password1 = "";
    this.password2 = "";
  }

  regist() {
    if (this.username2 && this.password1 && this.password2) {
      if (this.password2 == this.password1) {
        var params = {
          username: this.username2,
          password: this.password1,
          repassword: this.password2,
          fullname: this.fullname,
          email: this.email
        };
        this.UserService.regist(params).subscribe(
          data => {
            if (data) {
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

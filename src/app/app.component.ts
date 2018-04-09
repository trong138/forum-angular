import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModelService } from './core/model/user-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public UserLoginData: any;
  constructor(private Router: Router,
    private userModel: UserModelService,
  ) {
    // this.checkLogin();
    this.Router.navigate(['/login']);
  }

  private checkLogin() {
    this.UserLoginData = this.userModel.getCookieUserInfo();
    console.log('BaseComponent checkLogin', this.UserLoginData);
    if (!this.UserLoginData) {
      
    } else {

    }
  }
}

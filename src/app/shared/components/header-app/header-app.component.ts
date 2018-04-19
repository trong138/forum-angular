import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/util/local-storage.service';
import { UserModelService } from '../../../core/model/user-model.service';
import { UserService } from '../../../core/api/user.service';
import { ConfigService } from '../../../core/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css']
})
export class HeaderAppComponent implements OnInit {
  listTitle = [
    { name: 'Home', value: 0 },
    { name: 'Question', value: 1 },
    { name: 'Category', value: 2 },
    { name: 'Gold Member', value: 3 },
    { name: 'Team', value: 4 },
    { name: 'Me', value: 5 },
  ];
  private userInfo;
  private imageProfile;
  constructor(private Router: Router,
    private storage: LocalStorageService,
    private UserService: UserService,
    private userModal: UserModelService,
    private ConfigService: ConfigService
  ) { }

  ngOnInit() {
    // this.getUserInfo(this.userModal.getCookieUserInfo().id);
  }

  changePage(id) {

    if (id == 0) this.goToHome();
    else if (id == 1) this.goToCategories();
    else if (id == 3) this.goToTopFollow();

    else if (id == 4) this.goToSetting();
    else if (id == 5) this.goToInfo();
    // else if (id == 2) this.goToLogin();

  }

  getUserInfo(id) {
    this.UserService.getInfoUser(id).subscribe(data => {
      this.userInfo = data;
      console.log("[DetailComponent:ngOnInit] userinfo", data);
      this.getImageProfile();

    }, err => {
      console.log(err);
    });
  }

  getImageProfile() {
    // var url = this.ConfigService.getBaseURL();
    this.imageProfile = this.UserService.getImageProfile(this.userInfo.username);
  }

  goToHome() {
    this.Router.navigate(['/features/home', {
      iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }

  goToInfo() {
    this.Router.navigate(['/features/user-info', {
      iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }

  goToTopFollow() {
    this.Router.navigate(['/features/top-follow', {
      iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }

  goToSetting() {

  }

  goToLogin() {
    localStorage.removeItem('userSession');
    this.Router.navigate(['/login', {}]);
  }

  goToCategories() {

    this.Router.navigate(['/features/categories', {
      iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }

}

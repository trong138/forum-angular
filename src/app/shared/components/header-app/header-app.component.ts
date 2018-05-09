import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/util/local-storage.service';
import { UserModelService } from '../../../core/model/user-model.service';
import { UserService } from '../../../core/api/user.service';
import { ConfigService } from '../../../core/config.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { APP_CONFIG } from '../../../core/config.const';
import { NotificationService } from '../../../core/api/notification.service';


@Component({
  selector: 'app-header',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css']
})
export class HeaderAppComponent implements OnInit {
  listTitle = [
    { name: 'Home', value: 0 },
    { name: 'Question', value: 1 },
    // { name: 'Category', value: 2 },
    { name: 'Gold Member', value: 3 },
    // { name: 'Team', value: 4 },
    { name: 'My Profile', value: 5 },
    { name: 'Logout', value: 6 },
  ];
  ws;
  private count = 0;
  private id_user;
  private userInfo;
  private imageProfile;
  private notify_not_seen;
  listNotification = [];
  constructor(private Router: Router,
    private storage: LocalStorageService,
    private UserService: UserService,
    private userModal: UserModelService,
    private ConfigService: ConfigService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    // this.getUserInfo(this.userModal.getCookieUserInfo().id);
    if (this.userModal.getCookieUserInfo()) {
      this.id_user = this.userModal.getCookieUserInfo().id;
      console.log("id_user", this.id_user);
    }
    this.connect();
    this.getNotification();
  }

  connect() {
    var host = APP_CONFIG[0].base_url;
    var url = host + 'socket';
    let socket = new SockJS(url);
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect({}, data => {
      that.ws.subscribe('/notify/' + this.id_user, mess => {
        console.log('data-notify', JSON.parse(mess.body));
        this.listNotification.splice(0, 0, JSON.parse(mess.body));
        // this.listNotification.push();
        this.checkNumberNotify();
      })
    }, err => {

    })
  }

  seenNotify() {
    this.notification.seen().subscribe(data => {
      console.log("data-notification", data);
      this.getNotification();
      this.count == 0;
    }, err => {
      console.log("err-notification", err);
    })
  }

  getNotification(page?) {
    this.listNotification = [];
    var params = {
      page: 0,
      size: 100
    }
    this.notification.get(params).subscribe(data => {
      console.log("data-notification", data);
      this.listNotification = data;
      this.checkNumberNotify();
    }, err => {
      console.log("err-notification", err);
    })
  }

  goToQuestion(id) {
    this.Router.navigate(['/features/detail-post', {
      id: id
    }]);
  }

  checkNumberNotify() {
    var number = 0;
    for (let i = 0; i < this.listNotification.length; i++) {
      if (this.listNotification[i].seen == false) {
        number++;
      }
    }
    this.notify_not_seen = number;
  }

  changePage(id) {

    if (id == 0) this.goToHome();
    else if (id == 1) this.goToCategories();
    else if (id == 3) this.goToTopFollow();

    else if (id == 4) this.goToSetting();
    else if (id == 5) this.goToInfo();
    else if (id == 6) this.goToLogin();
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
    // this.imageProfile = this.UserService.getImageProfile(this.userInfo.username);
  }

  goToHome() {
    this.Router.navigate(['/features/home', {
      // iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }

  goToInfo() {
    this.Router.navigate(['/features/user-info', {
      iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }

  goToTopFollow() {
    this.Router.navigate(['/features/top-follow', {
      // iduser: this.userModal.getCookieUserInfo().id,
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
      // iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }

}

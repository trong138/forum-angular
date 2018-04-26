import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/api/user.service';
import { UserModelService } from '../../core/model/user-model.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-follow',
  templateUrl: './top-follow.component.html',
  styleUrls: ['./top-follow.component.css']
})
export class TopFollowComponent implements OnInit {
  listUserFollow = [];
  id_user;
  listTopUser = [];
  constructor(private user: UserService,
    private Router: Router,
    private userModal: UserModelService) { }

  ngOnInit() {
    if (this.userModal.getCookieUserInfo()) {
      this.id_user = this.userModal.getCookieUserInfo().id;
      console.log("id_user", this.id_user);
      if (this.id_user) {
        this.getListUserFollow();
      }
    }
    this.getTopUser();
  }

  userInfo(id) {
    this.Router.navigate(['/features/user-info', {
      iduser: id
    }]);
  }

  getListUserFollow() {
    var params = {
      "page": "0",
      "size": "100",
      "sort": "+username"
    };
    this.user.getListUserFollow(params).subscribe(data => {
      console.log('getListUserFollow', data);
      this.listUserFollow = data;
    }, err => {
      console.log('getListUserFollow', err);
    })
  }

  getTopUser() {
    var params = {
      "page": "0",
      "size": "100",
      "sort": "-follow"
    };
    this.user.getTopUser(params).subscribe(data => {
      console.log('listTopUser', data);
      this.listTopUser = data;
    }, err => {
      console.log('listTopUser', err);
    })
  }
}

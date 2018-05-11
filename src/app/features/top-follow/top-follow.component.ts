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
  page_follow = 0;
  page_top = 0;
  show_load_more_follow = true;
  show_load_more_top = true;
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

  getListUserFollow(page?) {
    var params = {
      "page": page || "0",
      "size": "4",
      "sort": "+username"
    };
    if (!page) {
      this.listUserFollow = [];
    }
    this.user.getListUserFollow(params).subscribe(data => {
      if (data.length == 4) {
        this.show_load_more_follow = true;
      } else {
        this.show_load_more_follow = false;
      }
      console.log('getListUserFollow', data);
      if (!page) {
        this.listUserFollow = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listUserFollow.push(data[i]);
        }
      }
    }, err => {
      console.log('getListUserFollow', err);
      this.show_load_more_follow = false;
    })
  }

  getTopUser(page?) {
    var params = {
      "page": page || "0",
      "size": "4",
      "sort": "-follow"
    };
    if (!page) {
      this.listTopUser = [];
    }
    this.user.getTopUser(params).subscribe(data => {
      if (data.length == 4) {
        this.show_load_more_top = true;
      } else {
        this.show_load_more_top = false;
      }
      console.log('listTopUser', data);
      if (!page) {
        this.listTopUser = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listTopUser.push(data[i]);
        }
      }
    }, err => {
      console.log('listTopUser', err);
      this.show_load_more_top = false;
    })
  }

  loadMore(type) {
    if (type == 'follow') {
      this.page_follow++;
      this.getListUserFollow(this.page_follow);
    } else if (type == 'top') {
      this.page_top++;
      this.getTopUser(this.page_top);
    }
  }
}

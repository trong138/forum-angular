import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/api/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  listUser = [];
  show_load_more = true;
  page = 0;
  constructor(private user: UserService) { }

  ngOnInit() {
    this.getListUser();
  }

  getListUser(page?) {

    var params = {
      "page": page || "0",
      "size": "8",
    };
    if (!page) {
      this.listUser = [];
    }
    this.user.getTopUser(params).subscribe(data => {
      if (data.length == 8) {
        this.show_load_more = true;
      } else {
        this.show_load_more = false;
      }
      console.log('listTopUser', data);
      if (!page) {
        this.listUser = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listUser.push(data[i]);
        }
      }
    }, err => {
      console.log('listTopUser', err);
      this.show_load_more = false;
    })
  }

  loadMore() {
    this.page++;
    this.getListUser(this.page);
  }

  admin(id) {
    this.user.admin(id).subscribe(data => {
      // console.log('listTopUser', data);
      this.getListUser();
    }, err => {
      console.log('admin', err);
      if (err.status == 403) {
        document.getElementById('id_model_user_management').click();
      }
    })
  }

  ban(id) {
    this.user.ban(id).subscribe(data => {
      // console.log('listTopUser', data);
      this.getListUser();
    }, err => {
      console.log('ban', err);
    })
  }

  unban(id) {
    this.user.unban(id).subscribe(data => {
      // console.log('listTopUser', data);
      this.getListUser();
    }, err => {
      console.log('unban', err);
    })
  }
}


import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/api/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  listUser = [];
  constructor(private user: UserService) { }

  ngOnInit() {
    this.getListUser();
  }

  getListUser() {

    var params = {
      "page": "0",
      "size": "100",
    };
    this.user.getTopUser(params).subscribe(data => {
      console.log('listTopUser', data);
      this.listUser = data;
    }, err => {
      console.log('listTopUser', err);
    })
  }

  admin(id) {
    this.user.admin(id).subscribe(data => {
      // console.log('listTopUser', data);
      this.getListUser();
    }, err => {
      console.log('admin', err);
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


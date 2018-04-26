import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  listTitle = [
    { name: 'Category', value: 0, select: false },
    { name: 'Question', value: 1, select: true },
    { name: 'User', value: 2, select: false },
    // { name: 'My Profile', value: 3, select: false },
    { name: 'Logout', value: 4, select: false },
  ];

  constructor(private Router: Router) { }

  ngOnInit() {
  }

  userFunction(id) {
    if (id == 4) {
      this.Router.navigate(['/login', {}]);
    } else {
      for (let i = 0; i < this.listTitle.length; i++) {
        if (this.listTitle[i].value == id) {
          this.listTitle[i].select = true;
        } else {
          this.listTitle[i].select = false;
        }
      }
    }
  }
}

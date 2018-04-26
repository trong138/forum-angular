import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModelService } from '../../core/model/user-model.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private checkShowLogin = true;
  constructor(private Router: Router,
    private userModal: UserModelService) { }

  ngOnInit() {
    if (this.userModal.getCookieUserInfo()) {
      this.checkShowLogin = false;
    }
  }

  goToLogin() {
    this.Router.navigate(['/login', {}]);
  }

  goToCategory() {
    this.Router.navigate(['/features/categories', {
      // iduser: id
    }]);
  }

  goToTopUser() {
    this.Router.navigate(['/features/top-follow', {
      // iduser: id
    }]);
  }
}

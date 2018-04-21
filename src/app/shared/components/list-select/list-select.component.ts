import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from '../../../core/api/categories.service';
import { Router } from '@angular/router';
import { UserModelService } from '../../../core/model/user-model.service';

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.css']
})
export class ListSelectComponent implements OnInit {
  @Output('emitParams') emit_params = new EventEmitter();
  private listCategories = [];
  id_user;
  constructor(private categories: CategoriesService,
    private Router: Router,
    private userModal: UserModelService) { }

  ngOnInit() {
    if (this.userModal.getCookieUserInfo()) {
      this.id_user = this.userModal.getCookieUserInfo().id;
      console.log("id_user", this.id_user);
    }
    this.getListCategories();
  }

  getListCategories() {
    this.categories.get().subscribe(data => {
      console.log("categories-getlist", data);
      this.listCategories = data;
    }, err => {
      console.log('categories', err);
    });
  }

  emitParams(text, type) {

    this.emit_params.emit({
      text: text,
      type: type
    })
  }

  goToPageQuestion() {
    this.Router.navigate(['/features/categories', {
      // iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }
}

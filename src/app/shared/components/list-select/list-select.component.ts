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
  constructor(private categories: CategoriesService,
    private Router: Router,
    private userModal: UserModelService) { }

  ngOnInit() {
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

  goToYourQuestion() {
    this.Router.navigate(['/features/your-question', {
      iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }

  goToCreateQuestion() {
    this.Router.navigate(['/features/create-edit-question', {
      iduser: this.userModal.getCookieUserInfo().id,
    }]);
  }
}

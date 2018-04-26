import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/api/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  listCategories = [];
  textEdit;
  id_edit;
  type_modal;
  constructor(private categories: CategoriesService) { }

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

  delete(id) {
    this.categories.delete(id).subscribe(data => {
      console.log("delete", data);
      this.getListCategories();
    }, err => {
      console.log('delete', err);
    });
  }

  submit() {
    if (this.type_modal == 'add') {
      this.add();
    } else if (this.type_modal == 'edit') {
      this.edit();
    }
  }

  add() {
    var params = {
      name: this.textEdit
    }
    this.categories.add(params).subscribe(data => {
      console.log("add", data);
      this.getListCategories();
    }, err => {
      console.log('add', err);
    });
  }

  edit() {
    var params = {
      name: this.textEdit
    }
    this.categories.update(params, this.id_edit).subscribe(data => {
      console.log("update", data);
      this.getListCategories();
    }, err => {
      console.log('update', err);
    });
  }
}

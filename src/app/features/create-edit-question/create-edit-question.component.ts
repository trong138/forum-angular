import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/api/categories.service';
import { QuestionsService } from '../../core/api/questions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-question',
  templateUrl: './create-edit-question.component.html',
  styleUrls: ['./create-edit-question.component.css']
})
export class CreateEditQuestionComponent implements OnInit {
  private listCategories = [];
  private tittle;
  private type_page = 'create';
  private category;
  private id_question;
  private content;
  constructor(private categories: CategoriesService,
    private Router: Router,
    private route: ActivatedRoute,
    private question: QuestionsService) {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id) {
          this.id_question = id;
          this.type_page = 'edit';
          this.getQuestion(id);
        }
      });
  }

  ngOnInit() {
    this.getListCategories();
  }

  getQuestion(id) {
    this.question.detail(id).subscribe(data => {
      this.tittle = data.title;
      this.content = data.content;
      this.category = data.categoryName;
      console.log('getQuestion', data);
    }, err => {
      console.log('getQuestion', err);
    })
  }

  getListCategories() {
    this.categories.get().subscribe(data => {
      console.log("categories-getlist", data);
      this.listCategories = data;
    }, err => {
      console.log('categories', err);
    });
  }

  submit() {
    if (this.type_page == 'create') {
      this.createQuestion();
    } else if (this.type_page == 'edit') {
      this.editQuestion();
    }
  }

  createQuestion() {
    var params = {
      title: this.tittle,
      content: this.content,
      category: this.category
    }
    console.log('create', params);
    this.question.create(params).subscribe(data => {
      console.log("create-question", data);
      this.Router.navigate(['/features/categories', {
        // iduser: this.userModel.getCookieUserInfo().id,
      }]);
    }, err => {
      console.log("create-question", err);
    })
  }

  takeData() {
    ///////////lay thon tin data

  }

  editQuestion() {
    var params = {
      title: this.tittle,
      content: this.content,
      category: this.category
    }
    this.question.edit(params, this.id_question).subscribe(data => {
      console.log("edit-question", data);
      this.Router.navigate(['/features/categories', {
        // iduser: this.userModel.getCookieUserInfo().id,
      }]);
    }, err => {

    })
  }

  cancal() {
    window.history.back();
  }
}

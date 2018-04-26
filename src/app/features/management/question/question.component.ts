import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../core/api/questions.service';
import { CategoriesService } from '../../../core/api/categories.service';
import { AnswerService } from '../../../core/api/answer.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  // tittle;
  // content;
  // category;
  question_detail;
  textEdit;
  checkEdit = [];
  listQuestion = [];
  type_modal;
  id_select;
  listCategories = [];
  questionEdit;
  list_answer = [];
  constructor(private question: QuestionsService,
    private answer: AnswerService,
    private categories: CategoriesService) { }

  ngOnInit() {
    this.getListQuestion();
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

  getListQuestion(page?) {
    this.listQuestion = [];
    var params = {
      "page": "0",
      "size": "100",
      "sort": "-lastModified"
    }
    this.question.get(params).subscribe(data => {
      console.log("list-question", data);
      this.listQuestion = data;
    }, err => {
      console.log("err-list-question", err);
    })
  }


  delete(id) {
    this.question.delete(id).subscribe(data => {
      console.log("delete", data);
      this.getListQuestion();
    }, err => {
      console.log('delete', err);
    });
  }

  submit() {
    if (this.type_modal == 'add') {
      this.add();
    } else if (this.type_modal == 'edit') {
      this.edit();
    } else if (this.type_modal == 'detail') {
      // this.getPrivate(this.id_select);
    }
  }

  getListAnswer(id) {
    var params = {
      "page": "0",
      "size": "100",
      "sort": "-lastModified"
    }
    this.answer.get(params, id).subscribe(data => {
      console.log("list-answer", data);
      this.list_answer = data;
    }, err => {
      console.log("list-answer", err);
    })
  }

  add() {
    var params = {
      title: this.questionEdit.title,
      content: this.questionEdit.content,
      category: this.questionEdit.categoryName
    }
    this.question.create(params).subscribe(data => {
      console.log("add", data);
      this.getListQuestion();
    }, err => {
      console.log('add', err);
    });
  }

  edit() {
    var params = {
      title: this.questionEdit.title,
      content: this.questionEdit.content,
      category: this.questionEdit.categoryName
    }
    this.question.edit(params, this.id_select).subscribe(data => {
      console.log("update", data);
      this.getListQuestion();
    }, err => {
      console.log('update', err);
    });
  }

  editAnswer(id) {
    var params = {
      content: this.textEdit
    };
    this.answer.edit(params, id).subscribe(data => {
      console.log("update", data);
      this.getListAnswer(this.id_select);
    }, err => {
      console.log("update", err);
    })
  }

  deleteAnswer(id) {
    this.answer.delete(id).subscribe(data => {
      console.log("detele", data);
      this.getListAnswer(this.id_select);
    }, err => {
      console.log("delete", err);
    })
  }
}

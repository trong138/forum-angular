import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../core/api/questions.service';
import { CategoriesService } from '../../../core/api/categories.service';
import { AnswerService } from '../../../core/api/answer.service';
declare var CKEDITOR: any;
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
  questionSelect;
  textEdit;
  checkEdit = [];
  listQuestion = [];
  type_modal;
  id_select;
  listCategories = [];
  questionEdit;
  list_answer = [];
  page = 0;
  page_answer = 0;
  show_load_more_answer = true;
  show_load_more_question = true;
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
    var params = {
      "page": page || "0",
      "size": "8",
      "sort": "-lastModified"
    }
    if (!page) {
      this.listQuestion = [];
    }
    this.question.get(params).subscribe(data => {
      if (data.length == 8) {
        this.show_load_more_question = true;
      } else {
        this.show_load_more_question = false;
      }
      console.log("list-question", data);
      if (!page) {
        this.listQuestion = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listQuestion.push(data[i]);
        }
      }

    }, err => {
      console.log("err-list-question", err);
      this.show_load_more_question = false;
    })
  }

  loadMore(type) {
    if (type == 'question') {
      this.page++;
      this.getListQuestion(this.page);
    } else if (type == 'answer') {
      this.page_answer++;
      this.getListAnswer(this.id_select, this.page_answer);
    }
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

  initEditDetail(id) {
    for (let i = 0; i < this.checkEdit.length; i++) {
      this.checkEdit[i] = false;
    }
    this.checkEdit[id] = true;
    setTimeout(() => {
      CKEDITOR.replace('textEdit');
      CKEDITOR.instances.textEdit.setData(this.textEdit);
    }, 10);
  }

  initEdit(item) {
    setTimeout(() => {
      for (var name in CKEDITOR.instances) {
        CKEDITOR.instances[name].destroy();
      }
      CKEDITOR.replace('contentEdit');
      CKEDITOR.instances.contentEdit.setData(item);
    }, 10);
  }

  getListAnswer(id, page?) {
    var params = {
      "page": page || "0",
      "size": "5",
      "sort": "-lastModified"
    }
    if (!page) {
      this.list_answer = [];
    }
    this.answer.get(params, id).subscribe(data => {
      if (data.length == 5) {
        this.show_load_more_answer = true;
      } else {
        this.show_load_more_answer = false;
      }
      console.log("list-answer", data);
      if (!page) {
        this.list_answer = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.list_answer.push(data[i]);
        }
      }

    }, err => {
      console.log("list-answer", err);
      this.show_load_more_answer = false;
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
    if (CKEDITOR.instances.contentEdit.getData(this.questionSelect.content) == "") {
      document.getElementById('id_model_edit').click();
    } else {
      var params = {
        title: this.questionSelect.title,
        content: CKEDITOR.instances.contentEdit.getData(),
        category: this.questionSelect.categoryName
      }
      this.question.edit(params, this.id_select).subscribe(data => {
        console.log("update", data);
        this.getListQuestion();
      }, err => {
        console.log('update', err);
      });
    }
  }

  editAnswer(id) {
    this.textEdit = CKEDITOR.instances.textEdit.getData();
    if (this.textEdit == "") {
      document.getElementById('id_model_detail_post').click();
    } else {
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

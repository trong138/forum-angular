import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../core/api/categories.service';
import { QuestionsService } from '../../core/api/questions.service';
import { UserModelService } from '../../core/model/user-model.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private listPost: any = [];
  private listCategories = [];
  private title;
  private id_user;
  private statusList;
  private categorySelect;
  constructor(private Router: Router,
    private userModal: UserModelService,
    private categories: CategoriesService,
    private question: QuestionsService) { }

  ngOnInit() {
    if (this.userModal.getCookieUserInfo()) {
      this.id_user = this.userModal.getCookieUserInfo().id;
      console.log("id_user", this.id_user);
    }
    // this.getListCategories();
    this.getListQuestion();
    // this.getListQuestionNotAnswer();
  }


  getListQuestion(page?) {
    this.statusList = 'auto';
    this.listPost = [];
    var params = {
      "page": "0",
      "size": "100",
      "sort": "-lastModified"
    }
    this.question.get(params).subscribe(data => {
      console.log("list-question", data);
      this.listPost = data;
      this.title = 'List Question';
    }, err => {
      console.log("err-list-question", err);
    })
  }

  getListYourQuestion(page?) {
    this.statusList = 'yourquestion';
    var params = {
      "page": page | 0,
      "size": "100",
      "sort": "-lastModified"
    }
    this.question.getWithIdUser(params, this.id_user).subscribe(data => {
      console.log("getListQuestion", data);
      this.listPost = data;
    }, err => {
      console.log("getListQuestion", err);
    })
  }

  getListWithCategory(category, page?) {
    this.categorySelect = category;
    this.statusList = 'category';
    this.listPost = [];
    var params = {
      "page": "0",
      "size": "100",
      "name": category,
      "sort": "-createAt"
    }
    this.question.getWithCategory(params).subscribe(data => {
      console.log("list-question-categoy", data);
      this.listPost = data;
      this.title = 'List Question ' + category;
    }, err => {
      console.log("err-list-question", err);
    })
  }

  getListQuestionNotAnswer(page?) {
    this.statusList = 'notanswer';
    this.listPost = [];
    var params = {
      'page': '0',
      'size': '100',
      'quatity': '0'
    }
    this.question.getNotAnswer(params).subscribe(data => {
      console.log("list-question-notanswer", data);
      this.listPost = data;
      this.title = 'List Question Not Answer';
    }, err => {
      console.log("err-list-question-notanswer", err);
    })
  }

  search(key) {
    console.log(key);
    this.statusList = 'search';
    this.listPost = [];
    var params = {
      'page': '0',
      'size': '100',
      'keyword': key
    }
    this.question.search(params).subscribe(data => {
      console.log("list-question-search", data);
      this.listPost = data;
      this.title = 'List Question';
    }, err => {
      console.log("err-list-question-search", err);
    })
  }

  getListQuestionFollow(page?) {
    this.statusList = 'follow';
    this.listPost = [];
    var params = {
      "page": "0",
      "size": "100",
      "sort": "-lastModified"
    }
    this.question.getFollow(params).subscribe(data => {
      console.log("list-question-follow", data);
      this.listPost = data;
      this.title = "Questions You Follow";
    }, err => {
      console.log("err-list-question-follow", err);
    })
  }

  reLoadListQuestion() {
    if (this.statusList = 'auto') {
      this.getListQuestion();
    } else if (this.statusList = 'yourquestion') {
      this.getListYourQuestion();
    } else if (this.statusList = 'category') {
      this.getListWithCategory(this.categorySelect);
    } else if (this.statusList = 'notanswer') {
      this.getListQuestionNotAnswer();
    } else if (this.statusList = 'follow') {
      this.getListQuestionNotAnswer();
    }
  }

  goToCreateQuestion() {
    if (this.id_user) {
      this.Router.navigate(['/features/create-edit-question', {
        // iduser: this.userModal.getCookieUserInfo().id,
      }]);
    } else {
      var button = document.getElementById('modal-add-question');
      button.click();
    }
  }

  goToDetail(id) {
    this.Router.navigate(['/features/detail-post', {
      id: id
    }]);
  }

  goToLogin() {
    this.Router.navigate(['/login', {
    }]);
  }

  edit(id) {
    this.Router.navigate(['/features/create-edit-question', {
      id: id
    }]);
  }

  delete(id) {
    this.question.delete(id).subscribe(data => {
      console.log("delete-question", data);
      this.reLoadListQuestion();
    }, err => {
      console.log("delete-question", err);
    })
  }

  emitParams(event) {
    if (event.type == 2) {
      if (event.text == 'not-answer') {
        this.getListQuestionNotAnswer();
      } else if (event.text == 'you-follow') {
        this.getListQuestionFollow();
      } else if (event.text == 'your-question') {
        this.getListYourQuestion();
      }
    } else if (event.type == 1) {
      this.getListWithCategory(event.text);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../core/api/categories.service';
import { QuestionsService } from '../../core/api/questions.service';
import { UserModelService } from '../../core/model/user-model.service';
import { UserService } from '../../core/api/user.service';

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
  private keySearch;
  private page = 0;
  private userInfo;
  private show_load_more = true;
  constructor(private Router: Router,
    private userModal: UserModelService,
    private categories: CategoriesService,
    private UserSevice: UserService,
    private question: QuestionsService) { }

  ngOnInit() {
    if (this.userModal.getCookieUserInfo()) {
      this.id_user = this.userModal.getCookieUserInfo().id;
      console.log("id_user", this.id_user);
      this.getUserInfo(this.id_user);
    }
    // this.getListCategories();
    this.getListQuestion();
    // this.getListQuestionNotAnswer();
  }

  getUserInfo(id) {
    this.UserSevice.getInfoUser(id).subscribe(data => {
      this.userInfo = data;
      console.log("getInfoUser", data);
    }, err => {
      console.log(err);
    });
  }

  getListQuestion(page?) {
    console.log("page", page);
    if (this.statusList != 'auto') {
      this.page = 0;
      this.statusList = 'auto';
    }
    // this.statusList = 'auto';
    if (!page) {
      this.listPost = [];
    }

    var params = {
      "page": page || "0",
      "size": "5",
      "sort": "-lastModified"
    }
    console.log("params", params);
    this.question.get(params).subscribe(data => {
      console.log("list-question", data);
      if (data.length == 5) {
        this.show_load_more = true;
      } else {
        this.show_load_more = false;
      }
      if (!page) {
        this.listPost = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listPost.push(data[i]);
        }
      }

      this.title = 'List Question';
    }, err => {
      console.log("err-list-question", err);
      this.show_load_more = false;
    })
  }

  getListYourQuestion(page?) {
    if (this.statusList != 'yourquestion') {
      this.page = 0;
      this.statusList = 'yourquestion';
    }
    // this.statusList = 'yourquestion';
    if (!page) {
      this.listPost = [];
    }
    var params = {
      "page": page | 0,
      "size": "5",
      "sort": "-lastModified"
    }
    this.question.getWithIdUser(params, this.id_user).subscribe(data => {
      console.log("getListQuestion", data);

      if (data.length == 5) {
        this.show_load_more = true;
      } else {
        this.show_load_more = false;
      }
      if (!page) {
        this.listPost = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listPost.push(data[i]);
        }
      }
    }, err => {
      console.log("getListQuestion", err);
      this.show_load_more = false;
    })
  }

  getListWithCategory(category, page?) {

    if (this.statusList != 'category') {
      this.page = 0;
      this.statusList = 'category';
    }
    this.categorySelect = category;
    // this.statusList = 'category';

    if (!page) {
      this.listPost = [];
    }
    var params = {
      "page": page || "0",
      "size": "5",
      "name": category,
      "sort": "-createAt"
    }
    this.question.getWithCategory(params).subscribe(data => {

      if (data.length == 5) {
        this.show_load_more = true;
      } else {
        this.show_load_more = false;
      }
      console.log("list-question-categoy", data);
      if (!page) {
        this.listPost = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listPost.push(data[i]);
        }
      }
      this.title = 'List Question ' + category;
    }, err => {
      console.log("err-list-question", err);
      this.show_load_more = false;
    })
  }

  getListQuestionNotAnswer(page?) {
    if (this.statusList != 'notanswer') {
      this.page = 0;
      this.statusList = 'notanswer';
    }
    // this.statusList = 'notanswer';

    if (!page) {
      this.listPost = [];
    }
    var params = {
      "page": page || "0",
      'size': '5',
      'quatity': '0'
    }
    this.question.getNotAnswer(params).subscribe(data => {

      if (data.length == 5) {
        this.show_load_more = true;
      } else {
        this.show_load_more = false;
      }
      console.log("list-question-notanswer", data);
      if (!page) {
        this.listPost = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listPost.push(data[i]);
        }
      }
      this.title = 'List Question Not Answer';
    }, err => {
      console.log("err-list-question-notanswer", err);
      this.show_load_more = false;
    })
  }

  search(key, page?) {

    if (this.statusList != 'search') {
      this.page = 0;
      this.statusList = 'search';
    }

    this.keySearch = key;
    // this.statusList = 'search';

    if (!page) {
      this.listPost = [];
    }
    var params = {
      "page": page || "0",
      'size': '5',
      'keyword': key
    }
    this.question.search(params).subscribe(data => {

      if (data.length == 5) {
        this.show_load_more = true;
      } else {
        this.show_load_more = false;
      }
      console.log("list-question-search", data);
      if (!page) {
        this.listPost = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listPost.push(data[i]);
        }
      }
      this.title = 'List Question';
    }, err => {
      console.log("err-list-question-search", err);
      this.show_load_more = false;
    })
  }

  getListQuestionFollow(page?) {
    if (this.statusList != 'follow') {
      this.page = 0;
      this.statusList = 'follow';
    }
    if (!page) {
      this.listPost = [];
    }
    var params = {
      "page": page || "0",
      "size": "5",
      "sort": "-lastModified"
    }
    this.question.getFollow(params).subscribe(data => {

      if (data.length == 5) {
        this.show_load_more = true;
      } else {
        this.show_load_more = false;
      }
      console.log("list-question-follow", data);
      if (!page) {
        this.listPost = data;
      } else {
        for (let i = 0; i < data.length; i++) {
          this.listPost.push(data[i]);
        }
      }
      this.title = "Questions You Follow";
    }, err => {
      console.log("err-list-question-follow", err);
      this.show_load_more = false;
    })
  }

  loadMore() {
    this.page++;
    var page = this.page;
    console.log("--------------", page, this.statusList);
    if (this.statusList == 'auto') {
      this.getListQuestion(page);
    } else if (this.statusList == 'yourquestion') {
      this.getListYourQuestion(page);
    } else if (this.statusList == 'category') {
      this.getListWithCategory(this.categorySelect, page);
    } else if (this.statusList == 'notanswer') {
      this.getListQuestionNotAnswer(page);
    } else if (this.statusList == 'follow') {
      this.getListQuestionFollow(page);
    } else if (this.statusList == 'search') {
      this.search(this.keySearch, page);
    }
  }

  reLoadListQuestion() {
    if (this.statusList == 'auto') {
      this.getListQuestion();
    } else if (this.statusList == 'yourquestion') {
      this.getListYourQuestion();
    } else if (this.statusList == 'category') {
      this.getListWithCategory(this.categorySelect);
    } else if (this.statusList == 'notanswer') {
      this.getListQuestionNotAnswer();
    } else if (this.statusList == 'follow') {
      this.getListQuestionNotAnswer();
    } else if (this.statusList == 'search') {
      this.search(this.keySearch);
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

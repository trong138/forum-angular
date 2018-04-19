import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../core/api/categories.service';
import { QuestionsService } from '../../core/api/questions.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private listPost: any = [];
  private listCategories = [];
  private title;
  constructor(private Router: Router,
    private categories: CategoriesService,
    private question: QuestionsService) { }

  ngOnInit() {
    // this.getListCategories();
    this.getListQuestion();
    // this.getListQuestionNotAnswer();
  }


  getListQuestion(first?) {
    this.listPost = [];
    var params = {
      "page": "0",
      "size": "2",
      "sort": "-lastModified"
    }
    this.question.get(params).subscribe(data => {
      console.log("list-question", data);
      this.listPost = data;
      this.title = 'List Question';
    }, err => {
      console.log("list-question", err);
    })
  }

  getListWithCategory(category, first?) {
    this.listPost = [];
    var params = {
      "page": "0",
      "size": "2",
      "name": category,
      "sort": "-createAt"
    }
    this.question.getWithCategory(params).subscribe(data => {
      console.log("list-question-categoy", data);
      this.listPost = data;
      this.title = 'List Question ' + category;
    }, err => {
      console.log("list-question", err);
    })
  }

  getListQuestionNotAnswer(first?) {
    this.listPost = [];
    var params = {
      'page': '0',
      'size': '2',
      'quatity': '0'
    }
    this.question.getNotAnswer(params).subscribe(data => {
      console.log("list-question-notanswer", data);
      this.listPost = data;
      this.title = 'List Question Not Answer';
    }, err => {
      console.log("list-question-notanswer", err);
    })
  }

  goToDetail(id) {
    this.Router.navigate(['/features/detail-post', {
      id: id
    }]);
  }

  emitParams(event) {
    if (event.type == 2 && event.text == 'not-answer') {
      this.getListQuestionNotAnswer();
    } else if (event.type == 1) {
      this.getListWithCategory(event.text);
    }
  }

}

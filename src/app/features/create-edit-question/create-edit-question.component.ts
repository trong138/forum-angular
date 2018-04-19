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
  private id_category = 1;
  private content;
  constructor(private categories: CategoriesService,
    private Router: Router,
    private route: ActivatedRoute,
    private question: QuestionsService) {
    this.route.params
      .map(params => params['type'])
      .subscribe((data) => {
        if (data) {
          console.log("type_page", data);
          this.type_page = data;
          if (data == 'edit') {
            this.takeData();
          }
        }
      });
  }

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
      category: this.id_category
    }
    console.log('create', params);
    this.question.create(params).subscribe(data => {
      console.log("create-question", data);
      this.Router.navigate(['/features/your-question', {
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

  }
}

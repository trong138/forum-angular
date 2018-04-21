import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../core/api/questions.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
  private textComment;
  private id_question;
  private check_follow = false;
  constructor(private route: ActivatedRoute, private question: QuestionsService) {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id) {
          this.getPrivate(id);
          this.id_question = id;
        }
      });
  }

  ngOnInit() {
  }

  getPrivate(id) {
    this.question.detail(id).subscribe(data => {
      console.log("detail-question", data);
    }, err => {
      console.log("detail-question", err);
    })
  }

  emitParams(event) {
    if (event.type == 2 && event.text == 'not-answer') {
      // this.getListQuestionNotAnswer();
    }
  }

  comment() {
    console.log(this.textComment);
    this.textComment = "";
  }

  follow() {
    this.question.follow(this.id_question).subscribe(data => {
      console.log("follow", data);
    }, err => {
      console.log("follow", err);
    })
  }

  unfollow() {
    this.question.unfollow(this.id_question).subscribe(data => {
      console.log("unfollow", data);
    }, err => {
      console.log("unfollow", err);
    })
  }

}

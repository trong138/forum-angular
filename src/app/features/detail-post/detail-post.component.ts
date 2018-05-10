import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../../core/api/questions.service';
import { AnswerService } from '../../core/api/answer.service';
import { UserModelService } from '../../core/model/user-model.service';
declare var CKEDITOR: any;
@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
  private textComment;
  private id_question;
  private id_user;
  private question_detail;
  private list_answer = [];
  private check_follow = false;
  private checkEdit = [];
  private check_my_question = false;
  private textEdit;
  private page_answer = 0;
  constructor(private route: ActivatedRoute,
    private Router: Router,
    private question: QuestionsService,
    private userModal: UserModelService,
    private answer: AnswerService) {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id) {
          this.getPrivate(id);
          this.getListAnswer(id);
          this.id_question = id;
        }
      });
  }

  ngOnInit() {
    if (this.userModal.getCookieUserInfo()) {
      this.id_user = this.userModal.getCookieUserInfo().id;
      console.log("id_user", this.id_user);
      this.checkFollow(this.id_question);
      setTimeout(() => {
        CKEDITOR.replace('textComment');
      }, 1000);
    } else {
      this.id_user = null;
    }
  }

  initEdit(id) {
    for (let i = 0; i < this.checkEdit.length; i++) {
      this.checkEdit[i] = false;
    }
    this.checkEdit[id] = true;
    setTimeout(() => {
      CKEDITOR.replace('textEdit');
      CKEDITOR.instances.textEdit.setData(this.textEdit);
    }, 10);
  }

  getPrivate(id) {
    this.question.detail(id).subscribe(data => {
      console.log("detail-question", data);
      this.question_detail = data;
      if (this.id_user == data.userId) {
        this.check_my_question = true;
      } else {
        this.check_my_question = false;
      }
    }, err => {
      console.log("detail-question", err);
    })
  }

  checkFollow(id) {
    this.question.checkFollow(id).subscribe(data => {
      console.log("follow-question", data);
      this.check_follow = true;
      // this.question_detail = data;
    }, err => {
      this.check_follow = false;
      console.log("follow-question", err);
    })
  }

  loadMore() {
    this.page_answer++;
    this.getListAnswer(this.id_question, this.page_answer);
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
    })
  }

  emitParams(event) {
    if (event.type == 2 && event.text == 'not-answer') {
      // this.getListQuestionNotAnswer();
    }
  }

  comment() {
    this.textComment = CKEDITOR.instances.textComment.getData();
    if (this.textComment == "") {
      document.getElementById('id_model_detail_post').click();
    } else {
      var params = {
        content: this.textComment
      }
      console.log("textComment", this.textComment)
      this.answer.answer(params, this.id_question).subscribe(data => {
        console.log("answer-success", data);
        this.getListAnswer(this.id_question);
        CKEDITOR.instances.textComment.setData('');
      }, err => {
        console.log("answer-err", err);
      })
    }
  }

  userInfo(id) {
    this.Router.navigate(['/features/user-info', {
      iduser: id
    }]);
  }

  follow() {
    this.question.follow(this.id_question).subscribe(data => {
      console.log("follow", data);
      this.checkFollow(this.id_question);
    }, err => {
      console.log("follow", err);
    })
  }

  unfollow() {
    this.question.unfollow(this.id_question).subscribe(data => {
      console.log("unfollow", data);
      this.checkFollow(this.id_question);
    }, err => {
      console.log("unfollow", err);
    })
  }

  vote() {
    this.question.vote(this.id_question).subscribe(data => {
      console.log("vote", data);
      this.getPrivate(this.id_question);
    }, err => {
      console.log("vote", err);
    })
  }

  unvote() {
    this.question.unvote(this.id_question).subscribe(data => {
      console.log("unvote", data);
      this.getPrivate(this.id_question);
    }, err => {
      console.log("unvote", err);
    })
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
        this.getListAnswer(this.id_question);
      }, err => {
        console.log("update", err);
      })
    }
  }

  deleteAnswer(id) {
    this.answer.delete(id).subscribe(data => {
      console.log("detele", data);
      this.getListAnswer(this.id_question);
    }, err => {
      console.log("delete", err);
    })
  }


  voteAnswer(id) {
    this.answer.vote(id).subscribe(data => {
      console.log("vote", data);
      this.getListAnswer(this.id_question);
    }, err => {
      console.log("vote", err);
    })
  }

  unvoteAnswer(id) {
    this.answer.unvote(id).subscribe(data => {
      console.log("unvote", data);
      this.getListAnswer(this.id_question);
    }, err => {
      console.log("unvote", err);
    })
  }
}

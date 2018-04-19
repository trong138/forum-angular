import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
  private textComment;
  constructor(private route: ActivatedRoute, ) {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id) {

        }
      });
  }

  ngOnInit() {
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

}

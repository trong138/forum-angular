import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourQuestionComponent } from './your-question.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { yourQuestion } from './your-question.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(yourQuestion),
    FormsModule,
  ],
  declarations: [YourQuestionComponent]
})
export class YourQuestionModule { }

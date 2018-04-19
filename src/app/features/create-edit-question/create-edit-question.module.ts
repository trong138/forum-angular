import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditQuestionComponent } from './create-edit-question.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { createEditQuestion } from './create-edit-question.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(createEditQuestion),
    FormsModule,
  ],
  declarations: [CreateEditQuestionComponent]
})
export class CreateEditQuestionModule { }

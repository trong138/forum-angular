import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UtilModule } from '../util/util.module';
import { AnswerService } from './answer.service';
import { QuestionsService } from './questions.service';
import { CategoriesService } from './categories.service';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [
    CommonModule,
    UtilModule
  ],
  declarations: [
    // LoginService
  ],
  providers: [
    UserService,
    CategoriesService,
    QuestionsService,
    AnswerService,
    NotificationService
  ]
})
export class ApiModule { }

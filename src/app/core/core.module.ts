import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { ApiModule } from './api/api.module';
import { UtilModule } from './util/util.module';
import { UserModelService } from './model/user-model.service';
import { CategoriesService } from './api/categories.service';
import { QuestionsService } from './api/questions.service';
import { AnswerService } from './api/answer.service';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    UtilModule
  ],
  declarations: [],
  providers : [
    ConfigService,
    UserModelService,
    CategoriesService,
    QuestionsService,
    AnswerService
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { ApiModule } from './api/api.module';
import { UtilModule } from './util/util.module';
import { UserModelService } from './model/user-model.service';

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
  ]
})
export class CoreModule { }

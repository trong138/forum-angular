import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UtilModule } from '../util/util.module';

@NgModule({
  imports: [
    CommonModule,
    UtilModule
  ],
  declarations: [
    // LoginService
  ],
  providers: [
    UserService
  ]
})
export class ApiModule { }

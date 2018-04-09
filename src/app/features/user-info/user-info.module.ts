import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { RouterModule } from '@angular/router';
import { userInfoRoute } from './user-info.routes';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userInfoRoute),
    FormsModule,
  ],
  declarations: [
    UserInfoComponent,
  ]
})
export class UserInfoModule { }

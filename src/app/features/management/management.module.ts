import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { managementRoute } from './management.routes';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';
import { QuestionComponent } from './question/question.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(managementRoute),
    FormsModule,
  ],
  declarations: [ManagementComponent, CategoryComponent, UserComponent, QuestionComponent, ProfileComponent]
})
export class ManagementModule { }

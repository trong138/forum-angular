import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopFollowComponent } from './top-follow.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { topFollowRoute } from './top-follow.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(topFollowRoute),
    FormsModule,
  ],
  declarations: [TopFollowComponent]
})
export class TopFollowModule { }

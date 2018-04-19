import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPostComponent } from './detail-post.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { detailPostRoute } from './detail-post.routes';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(detailPostRoute),
    FormsModule,
    SharedModule
  ],
  declarations: [DetailPostComponent]
})
export class DetailPostModule { }

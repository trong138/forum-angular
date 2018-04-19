import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { categoriesRoute } from './categories.routes';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(categoriesRoute),
    FormsModule,
    SharedModule
  ],
  declarations: [CategoriesComponent]
})
export class CategoriesModule { }

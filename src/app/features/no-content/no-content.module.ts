import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoContentComponent } from './no-content.component';
import { RouterModule } from '@angular/router';
import { NoContentRoutes as routes } from './no-content.routes';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [NoContentComponent]
})
export class NoContentModule { }

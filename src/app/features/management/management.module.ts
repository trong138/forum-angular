import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { managementRoute } from './management.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(managementRoute),
    FormsModule,
  ],
  declarations: [ManagementComponent]
})
export class ManagementModule { }

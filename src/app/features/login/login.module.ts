import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { loginRoute } from './login.route';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
@NgModule({
  imports: [
    RouterModule.forChild(loginRoute),
    CommonModule,
    FormsModule,
    CoreModule,
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }

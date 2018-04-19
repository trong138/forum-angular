import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { loginRoute } from './login.route';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { HttpModule } from '@angular/http';
@NgModule({
  imports: [
    RouterModule.forChild(loginRoute),
    CommonModule,
    FormsModule,
    CoreModule,
    HttpModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAppComponent } from './components/header-app/header-app.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HeaderAppComponent
  ],
  exports: [
    HeaderAppComponent,
  ]
})
export class SharedModule { }

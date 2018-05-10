import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAppComponent } from './components/header-app/header-app.component';
import { ListSelectComponent } from './components/list-select/list-select.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule
  ],
  declarations: [
    HeaderAppComponent,
    ListSelectComponent
  ],
  exports: [
    HeaderAppComponent,
    ListSelectComponent
  ]
})
export class SharedModule { }

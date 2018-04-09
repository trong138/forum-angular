import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from './util.service';
import { AppAPIService } from './app-api.service';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpService } from './http.service';
import { HttpResponseService } from './http-response.service';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [],
  providers: [
    UtilService,
    AppAPIService,
    HttpService,
    HttpResponseService,
    LocalStorageService
  ]
})
export class UtilModule { }

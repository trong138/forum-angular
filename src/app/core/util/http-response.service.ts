import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

@Injectable()
export class HttpResponseService {
  nextLayer: any;

  constructor(private HttpService: HttpService) {
    // console.log('[HttpResponseService] constructor!');
    this.nextLayer = this.HttpService;
  }

  public get(url: string, params?: any, options?: any): Observable<any> {
    return this.nextLayer.get(url, params, options)
      .map(response => {
        console.log('HttpResponseService get map', response._body.result);
        return response._body.result;
      });
  }

  public post(url: string, params: any, options?: any): Observable<any> {
    return this.nextLayer.post(url, params, options)
      .map(response => {
        return JSON.parse(response._body);
      });
  }
  public uploadBlob(url: string, params: FormData, options?: any): Observable<any> {
    console.log("uploadBlob1", params);
    return this.nextLayer.uploadBlob(url, params, options)
      .map(response => {
        return response._body.result;
      });
  }

}

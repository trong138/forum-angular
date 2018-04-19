import { Injectable } from '@angular/core';
import { HttpResponseService } from './http-response.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppAPIService {

  nextLayer: any;

  constructor(private http: HttpResponseService) {
    this.nextLayer = this.http;
  }
  public get(url: string, params?: any, options?: any, livetime?: any): Observable<any> {
    return this.nextLayer.get(url, params, options)
      .map(response => {
        if (response && response.statusText == 'OK') {
          return response;
        } else {
          throw Observable.throw(response);
        }

      });
  }

  public post(url: string, params: any, options?: any, livetime?: any): Observable<any> {

    return this.nextLayer.post(url, params, options)
      .map(response => {
        if (response) {
          return response;
        } else {
          throw Observable.throw(response);
        }

      });
  }

  public uploadBlob(url: string, file, params: object, type?: string, options?: any): Observable<any> {
    console.log("uploadBlob", params);
    let input = new FormData();
    for (var key in params) {
      if (params.hasOwnProperty(key))
        input.append(key, params[key]);
    }

    if (type && type == "convert_document") {
      input.append('doc', file);
    } else {
      input.append('file', file);
    }
    console.log("input", input)
    return this.nextLayer.uploadBlob(url, input, options)
      .map(response => {
        if (response && response.status == 'OK') {
          return response;
        } else {
          throw Observable.throw(response);
        }
      });
  }
}



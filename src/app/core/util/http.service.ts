import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request,
  Jsonp
} from '@angular/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class HttpService {
  private jsonp = '?callback=JSONP_CALLBACK&';
  nextLayer: any;
  constructor(private http: Http,
    private config: ConfigService,
    private jsonpRequest: Jsonp) {
    this.nextLayer = null;
  }

  public get(url: string, params?: any, options?: RequestOptionsArgs): Observable<any> {
    let fullUrl: string = this.getFullUrl(url) + this.jsonp + this.serializeData(params);
    return this.jsonpRequest.get(fullUrl);
  }

  public post(url: string, params: any, token?: any): Observable<any> {
    return this.http.post(
      this.getFullUrl(url),
      params,
      this.requestOptions(token)
    );
  }

  public uploadBlob(url: string, params: FormData, options?: RequestOptionsArgs): Observable<any> {
    console.log("uploadBlob2", params)
    return this.http.post(
      this.getFullUrl(url),
      params
    );
  }

  private getFullUrl(url: string): string {
    return this.config.getBaseURL() + url;
  }

  private isObject(x: any): x is Object {
    return x != null && typeof x === 'object';
  }

  private serializeData(data): string {
    // If this is not an object, defer to native stringification.
    if (!this.isObject(data)) {
      return ((data == null) ? "" : data.toString());
    }
    let buffer = [];
    // Serialize each key in the object.
    for (let name in data) {
      if (!data.hasOwnProperty(name)) {
        continue;
      }
      let value = data[name];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          buffer.push(
            encodeURIComponent(name) + "=" + encodeURIComponent((value[i] == null) ? "" : value[i])
          );
        }
      } else {
        buffer.push(
          encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value)
        );
      }

    }
    // Serialize the buffer and clean it up for transportation.
    let source = buffer.join("&").replace(/%20/g, "+");
    // console.log("serializeData", source);
    return (source);
  }



  private requestOptions(token?): RequestOptionsArgs {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    if (token) {
      console.log("Authorization", token);
      headers.append('Authorization', token);
    }
    return new RequestOptions({ headers: headers });
  }
}


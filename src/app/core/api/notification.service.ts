import { Injectable } from '@angular/core';
import { AppAPIService } from '../util/app-api.service';
import { UserModelService } from '../model/user-model.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {

  constructor(private appApi: AppAPIService,
    private UserModelService: UserModelService) { }

  public get(params): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/notifications', params, token);
  }

  public seen(): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/notifications/seen', null, token);
  }

  public count(): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/notifications/count', null, token);
  }

}

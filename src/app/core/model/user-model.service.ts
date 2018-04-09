import { Injectable } from '@angular/core';
import { LocalStorageService } from '../util/local-storage.service';
import { AppAPIService } from '../util/app-api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserModelService {
  public userSession = this.storage.getObject('userSession') || { accesskey: '' };

  constructor(private storage: LocalStorageService, private appApi: AppAPIService) { }

  public usSession() {
    if (this.storage.getObject('userSession') !== null && this.storage.getObject('userSession') !== undefined) {
      this.userSession = this.storage.getObject('userSession');
    }
    return this.userSession;
  }

  public setCookieUserInfo(userData) {
    this.storage.setObject('userSession', userData);
  }

  public getCookieUserInfo() {
    return this.storage.getObject('userSession');
  }

  public checkApi(): Observable<any> {
    var params = {}
    params['token'] = this.usSession().accesskey;
    return this.appApi.post('api', params);
  }
}

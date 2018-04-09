import { Injectable } from '@angular/core';
import { AppAPIService } from '../util/app-api.service';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../util/http.service';
import { UserModelService } from '../model/user-model.service';
import { ConfigService } from '../config.service';

@Injectable()
export class UserService {

  constructor(private appApi: AppAPIService,
    private UserModelService: UserModelService,
    private ConfigService: ConfigService) { }

  public login(params: object): Observable<any> {
    return this.appApi.post('api/login', params);
  }

  public regist(params: object): Observable<any> {

    return this.appApi.post('api/register', params);
  }

  public getInfoUser(id): Observable<any> {
    var params = {
      id: id
    }
    params['token'] = this.UserModelService.usSession().accesskey;
    return this.appApi.post('api/user/get', params);
  }
  public getListUser(): Observable<any> {
    var params = {}
    params['token'] = this.UserModelService.usSession().accesskey;
    return this.appApi.post('api/user/list', params);
  }

  public searchListUser(params): Observable<any> {
    params['token'] = this.UserModelService.usSession().accesskey;
    return this.appApi.post('api/user/search_name', params);
  }

  public updateUser(params): Observable<any> {
    params['token'] = this.UserModelService.usSession().accesskey;
    return this.appApi.post('api/user/update', params);
  }

  public upload_image(file, params): Observable<any> {
    params = params || {};
    params['token'] = this.UserModelService.usSession().accesskey;
    params.file = file;
    console.log("upload_image", params);
    return this.appApi.uploadBlob('api/user/upload_profile', file, params);
  }

  public getImageProfile(username: String) {
    var url = this.ConfigService.getBaseURL();
    var a = new Date();
    return url + 'api/user/get_profile/' + username + "?token=" + this.UserModelService.usSession().accesskey + "&time=" + a.getTime();
    // return ;
  }
}

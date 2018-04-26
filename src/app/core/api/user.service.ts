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
    return this.appApi.post('api/auth', params);
  }

  public regist(params: object): Observable<any> {

    return this.appApi.post('api/users', params);
  }

  public getInfoUser(id): Observable<any> {
    return this.appApi.post('api/users/' + id, null);
  }

  public getTopUser(params): Observable<any> {
    // var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/users/paginated', params);
  }

  public updateUser(params): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/users/changePass', params, token);
  }

  public getListUserFollow(params): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/users/follow/paginated', params, token);
  }

  public checkFollow(id): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/users/' + id + '/checkFollow', null, token);
  }

  public follow(id): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/users/' + id + '/follow', null, token);
  }

  public unfollow(id): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/users/' + id + '/unfollow', null, token);
  }

  public ban(id): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/users/' + id + '/ban', null, token);
  }

  public unban(id): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/users/' + id + '/unban', null, token);
  }

  public admin(id): Observable<any> {
    var token = this.UserModelService.usSession().token;
    return this.appApi.post('api/users/' + id + '/changeAdmin', null, token);
  }

}

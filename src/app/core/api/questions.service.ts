import { Injectable } from '@angular/core';
import { AppAPIService } from '../util/app-api.service';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../util/http.service';
import { UserModelService } from '../model/user-model.service';
import { ConfigService } from '../config.service';

@Injectable()
export class QuestionsService {

    constructor(private appApi: AppAPIService,
        private UserModelService: UserModelService,
        private ConfigService: ConfigService) { }

    public get(params): Observable<any> {
        // var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/paginated', params);
    }

    public getWithCategory(params): Observable<any> {
        // var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/category/paginated', params);
    }

    public getWithIdUser(params, id_user): Observable<any> {
        // var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/user/' + id_user + '/paginated', params);
    }

    public getNotAnswer(params): Observable<any> {
        // var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/answer/paginated', params);
    }

    public search(params): Observable<any> {
        // var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/search', params);
    }

    public getFollow(params): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/follow/paginated', params, token);
    }

    public create(params): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions', params, token);
    }

    public delete(id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/' + id + '/delete', null, token);
    }

    public detail(id): Observable<any> {
        // var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/' + id, null);
    }

    public edit(params, id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/' + id + '/update', params, token);
    }

    public vote(id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/' + id + '/vote', null, token);
    }

    public unvote(id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/' + id + '/unvote', null, token);
    }

    public checkFollow(id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/' + id + '/checkFollow', null, token);
    }

    public follow(id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/' + id + '/follow', null, token);
    }

    public unfollow(id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/' + id + '/unfollow', null, token);
    }
}

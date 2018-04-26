import { Injectable } from '@angular/core';
import { AppAPIService } from '../util/app-api.service';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../util/http.service';
import { UserModelService } from '../model/user-model.service';
import { ConfigService } from '../config.service';

@Injectable()
export class AnswerService {

    constructor(private appApi: AppAPIService,
        private UserModelService: UserModelService,
        private ConfigService: ConfigService) { }

    public get(params, id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/answers/question/' + id + '/paginated', params, token);
    }

    public answer(params, id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/answers/question/' + id, params, token);
    }

    public vote(id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/answers/' + id + '/vote', null, token);
    }

    public unvote(id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/answers/' + id + '/unvote', null, token);
    }

    public delete(id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/answers/' + id + '/delete', null, token);
    }

    public edit(params, id): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/answers/' + id + '/update', params, token);
    }
}

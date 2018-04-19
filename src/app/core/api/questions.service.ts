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

    public getNotAnswer(params): Observable<any> {
        // var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions/answer/paginated', params);
    }

    public create(params): Observable<any> {
        var token = this.UserModelService.usSession().token;
        return this.appApi.post('api/questions', params, token);
    }
}

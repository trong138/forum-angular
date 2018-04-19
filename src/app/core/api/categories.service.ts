import { Injectable } from '@angular/core';
import { AppAPIService } from '../util/app-api.service';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../util/http.service';
import { UserModelService } from '../model/user-model.service';
import { ConfigService } from '../config.service';

@Injectable()
export class CategoriesService {

    constructor(private appApi: AppAPIService,
        private UserModelService: UserModelService,
        private ConfigService: ConfigService) { }

    public get(): Observable<any> {
        return this.appApi.post('api/categories/get', null);
    }

}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppConfigService } from '../app.config.service';
import * as state from '../state';
import { getLoggedUser } from '../state/app.reducers';
import { User } from '../models';

@Injectable()
export class BaseService  {
    options: RequestOptions;

    constructor(protected config: AppConfigService, protected  http: Http, private store: Store<state.AppState>) {
        this.store.select(getLoggedUser)
            .filter(user => !!user && !!user.token)
            .subscribe((user: User) => {
                let headers: Headers = new Headers();
                headers.append('Content-Type', 'Bearer ' + 'application/json');
                headers.append('Authorization', 'Bearer ' + user.token);

                this.options = new RequestOptions({ headers: headers });
            });
    }
}

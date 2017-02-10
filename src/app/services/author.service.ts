import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppConfigService } from '../app.config.service';
import * as state from '../state';
import { Author } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class AuthorService extends BaseService {
    constructor(config: AppConfigService, http: Http, store: Store<state.AppState>) {
        super(config, http, store);
    }

    load(): Observable<Author[]> {
        return this.http.get(`${this.config.apiUrl}/authors`, this.options)
            .map((response: Response) => response.json() || []);
    }
}

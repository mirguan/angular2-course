import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { AppConfigService } from '../app.config.service';
import { User } from '../models/user';
import { AppState } from '../state/app.state';
import * as login from '../state/login/login.actions';

@Injectable()
export class LoginService {
    private static handleError(error: Response | any): Promise<any> {
        let errorMessage: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errorMessage = error.message ? error.message : error.toString();
        }
        console.error(errorMessage);
        return Promise.reject(errorMessage);
    }

    constructor(private config: AppConfigService, private http: Http, store: Store<AppState> ) {
        let user = JSON.parse(localStorage.getItem('auth_token'));
        if (user) {
            store.dispatch(new login.LoginSuccess(user));
        }
    }

    login(username: string, password: string): Observable<User> {
        return this.http.post(`${this.config.apiUrl}/authenticate`, JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                let body = response.json();
                let user = Object.assign({}, body.user, {token: body.token, password: '*'.repeat(10)});
                localStorage.setItem('auth_token', JSON.stringify({ user }));
                return user;
            })
            .catch(error => LoginService.handleError(error));
    }

    logout(): void {
        localStorage.removeItem('auth_token');
    }
}

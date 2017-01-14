import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { LoginService } from '../../login/login.service';
import { User } from '../../models/user';
import * as login from './login.actions';

@Injectable()
export class LoginEffects {
    constructor(private actions: Actions, private loginService: LoginService) { }

    @Effect()
    login: Observable<Action> = this.actions
        .ofType(login.Login.Type)
        .map(action => action.payload)
        .switchMap(user => this.loginService.login(user.username, user.password)
            .map(data => {
                return new login.LoginSuccess(this.loginService.logginSuccess(<User>data));
            })
            .catch((error) => Observable.of(new login.LoginFailure(error)))
        );
}

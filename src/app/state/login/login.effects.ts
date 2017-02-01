/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import * as login from './login.actions';

@Injectable()
export class LoginEffects {
    constructor(private actions: Actions, private loginService: LoginService) { }

    @Effect()
    login$: Observable<Action> = this.actions
        .ofType(login.Login.Type)
        .map(action => <User>action.payload)
        .switchMap(user => this.loginService.login(user.login, user.password)
            .map(data => new login.LoginSuccess(data))
            .catch((error) => Observable.of(new login.LoginFailure(error)))
        );

    @Effect()
    logout$: Observable<Action> = this.actions
        .ofType(login.Logout.Type)
        .switchMap(() => Observable.of(this.loginService.logout())
            .map(() => new login.LogoutSuccess())
        );
}

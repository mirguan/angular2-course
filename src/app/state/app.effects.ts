/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { AppState, getLoginLoggedIn } from '../.index';
import * as login from './login.actions';
import {getRedirectUrl} from "./login/login.reducers";

@Injectable()
export class AppEffects {
    constructor(private actions: Actions, private router: Router, private store: Store<AppState>) { }

    @Effect()
    loginRedirect$: Observable<boolean> = this.actions
        .ofType(login.LoginRedirect.Type)
        .do (() =>  this.router.navigate('/login'));

    @Effect
    loginSuccess$: Observable<boolean> = this.actions
        .ofType(login.LoginSuccess.Type)
        .map(() => this.store.let(getRedirectUrl()).take(1))
        .do ((url) =>  this.router.navigate(url));
}

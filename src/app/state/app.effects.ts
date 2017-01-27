/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { AppState } from './app.state';
import { getLoginRedirectUrl } from './app.reducers';
import * as login from './login/login.actions';

@Injectable()
export class AppEffects {
    constructor(private actions: Actions, private router: Router, private store: Store<AppState>) { }

    @Effect()
    loginRedirect$ = this.actions
        .ofType(login.LoginRedirect.Type)
        .do(() => this.redirect('/login'))
        .ignoreElements();

    @Effect()
    loginSuccess$: Observable<Action> = this.actions
        .ofType(login.LoginSuccess.Type)
        .withLatestFrom(this.store.select(getLoginRedirectUrl))
        .map(([, url]) => url)
        .switchMap(url => this.redirect(url)
            .map(() => new login.LoginRedirectCleanup()));

    private redirect(url: string): Observable<boolean> {
        if (url !== null && url !== '') {
            return Observable.fromPromise(this.router.navigate([url]));
        }
        return Observable.of(true);
    }
}

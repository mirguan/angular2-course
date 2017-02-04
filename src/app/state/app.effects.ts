/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as state from './';
import * as login from './login/login.actions';

@Injectable()
export class AppEffects {
    constructor(private actions: Actions, private router: Router, private store: Store<state.AppState>) { }

    @Effect()
    loginRedirect$ = this.actions
        .ofType(login.LoginRedirect.Type)
        .do(() => this.router.navigate(['login']))
        .ignoreElements();

    @Effect()
    loginSuccess$: Observable<Action> = this.actions
        .ofType(login.LoginSuccess.Type)
        .withLatestFrom(this.store.select(state.getRedirectUrl))
        .map(([, url]) => url)
        .switchMap(url => this.redirect(url)
            .map(() => new login.LoginRedirectCleanup()));

    @Effect()
    logoutSuccess$: Observable<Action> = this.actions
        .ofType(login.LogoutSuccess.Type)
        .map(() => new login.LoginRedirect('#'));

    private redirect(url: string): Observable<boolean> {
        if (url !== null && url !== '') {
            if (url === '#') {
                return Observable.fromPromise(this.router.navigate(['']));
            }
            return Observable.fromPromise(this.router.navigate([url]));
        }
        return Observable.of(true);
    }
}

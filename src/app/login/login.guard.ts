import { Injectable } from '@angular/core';
import {Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { AppState, getLoginLoggedIn, LoginRedirect } from '../state/.index';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private store: Store<AppState>, private loginService: LoginService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.let(getLoginLoggedIn())
            .take(1)
            .do(loggedIn => {
               if (!loggedIn) {
                   let action = new LoginRedirect(state.url.startsWith('/login') ? '' : state.url);
                   this.store.dispatch(action);
               }

               return of(loggedIn);
            });


        if (this.loginService.loggedIn()) {
            return true;
        }

        this.loginService.redirectUrl = state.url;
        this.router.navigate(['/login']);

        return false;
    }
}

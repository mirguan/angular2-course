import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AppState, getLoggedIn, LoginRedirect } from '../../state';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private store: Store<AppState>, private loginService: LoginService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(getLoggedIn)
            .first()
            .do(loggedIn => {
               if (!loggedIn) {
                   let action = new LoginRedirect(state.url.startsWith('/login') ? '#' : state.url);
                   this.store.dispatch(action);
               }

               return Observable.of(loggedIn);
            });
    }
}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!!this.loginService.loggedIn()) {
            return true;
        }

        this.loginService.redirectUrl = state.url;
        this.router.navigate(['/login']);

        return false;
    }
}

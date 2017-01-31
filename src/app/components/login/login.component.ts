import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../services/login.service';
import * as state from '../../state/index';

@Injectable()
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    loggedIn: Observable<boolean>;
    title = 'LoginComponent';

    constructor(private router: Router, private loginService: LoginService, private store: Store<state.AppState>) {
        this.loggedIn = store.select(state.getLoggedIn);
    }
}

import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models';
import * as state from '../../state/index';
import { Login } from '../../state/login';
import { getErrorMessage, getHasError, getLoggedIn } from '../../state/app.reducers';

@Injectable()
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    user: User = new User();
    loginForm: FormGroup;
    errorMessage: Observable<string>;
    hasError: Observable<boolean>;

    constructor(private router: Router, private store: Store<state.AppState>, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.store.select(getLoggedIn)
            .take(1)
            .subscribe(loggedIn => {
                if (loggedIn) {
                    Observable.fromPromise(this.router.navigate(['']));
                }
            });

        this.loginForm = this.fb.group({
            'login': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
            'password': ['', Validators.compose([Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')])]
        });
        this.errorMessage = this.store.select(getErrorMessage);
        this.hasError = this.store.select(getHasError);
    }

    login() {
        this.store.dispatch(new Login(Object.assign({}, this.user)));
    }
}

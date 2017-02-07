import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../models';
import * as state from '../../state';

@Injectable()
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    user: User = new User();
    form: FormGroup;
    errorMessage: Observable<string>;
    hasError: Observable<boolean>;

    constructor(private router: Router, private store: Store<state.AppState>, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.subscription = this.store.select(state.getLoggedIn)
            .take(1)
            .subscribe(loggedIn => {
                if (loggedIn) {
                    Observable.fromPromise(this.router.navigate(['']));
                }
            });

        this.form = this.fb.group({
            'login': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
            'password': ['', Validators.compose([Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')])]
        });
        this.errorMessage = this.store.select(state.getErrorMessage);
        this.hasError = this.store.select(state.getHasError);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    login() {
        this.store.dispatch(new state.Login(Object.assign({}, this.user)));
    }
}

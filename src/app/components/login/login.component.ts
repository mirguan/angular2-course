import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../services/login.service';
import { User } from '../../models';
import * as state from '../../state/index';
import { Login } from '../../state/login';
import { getErrorMessage } from '../../state/app.reducers';

@Injectable()
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    user: User = new User();
    loginForm: FormGroup;
    serverError: Observable<string>;

    constructor(private router: Router, private loginService: LoginService, private store: Store<state.AppState>,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
            'password': ['', Validators.compose([Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')])]
        });
        this.serverError = this.store.select(getErrorMessage);
    }

    login() {
        this.store.dispatch(new Login(Object.assign({}, this.user)));
    }
}

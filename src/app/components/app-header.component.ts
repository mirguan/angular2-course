import {Component, Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as state from '../state';

@Injectable()
@Component({
    selector: 'app-header',
    template: `
        <div fxLayout="row" fxLayoutWrap class="item-box p-2 m-1 app-header">
            <div fxFlex="46px">
                <div fxLayout="row" fxLayoutWrap>
                    <div fxFlex="40px">
                        <img src="../../assets/icons/a2-course-36.png" alt="Angular2 Course App">
                    </div>
                </div>
            </div>
            <div *ngIf="loggedIn | async" fxFlex fxLayoutAlign="left center">
                <a routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}" [routerLink]=" ['./courses'] ">
                Courses
                </a>
            </div>
            <div *ngIf="loggedIn | async" fxFlex="120px">
                <app-login-pane 
                    [user]="user | async"
                    (logout)="logout($event)">
                </app-login-pane>
            </div>
        </div>
    `,
    styles: [`
        .display-4 {
            margin-left: -6px;
            font-size: 1.5rem;
            line-height: 1.4;
        }
        .app-header {
            background-color: #f0f2f5;
        }
    `]
})
export class AppHeaderComponent {
    user: Observable<User>;
    loggedIn: Observable<boolean>;

    constructor(private store: Store<state.AppState>) {
        this.user = store.select(state.getLoggedUser);
        this.loggedIn = store.select(state.getLoggedIn);
    }

    logout(user: User) {
        this.store.dispatch(new state.Logout());
    }

}


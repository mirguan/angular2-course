import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { action } from '../action.cache';

export class Login implements Action {
    static Type = action('[Login] Login');

    type = this.Type;
    constructor(public payload: User) { }
}

export class LoginSuccess implements Action {
    static Type = action('[Login] Login Success');

    type = this.Type;
    constructor(public payload: User) { }
}

export class LoginFailure implements Action {
    static Type = action('[Login] Login Failure');

    type = this.Type;
    constructor(public payload: string) { }
}

export class Logout implements Action {
    static Type = action('[Login] Logout');

    type = this.Type;
    constructor() { }
}

export class LogoutSuccess implements Action {
    static Type = action('[Login] Logout Success');

    type = this.Type;
    constructor() { }
}

export type Actions
    = Login | LoginSuccess | LoginFailure
    | Logout | LoginSuccess;



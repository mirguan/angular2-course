import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { action } from '../action.cache';

export class Login implements Action {
    static Type = action('[Login] Login');

    type = Login.Type;
    constructor(public payload: User) { }
}

export class LoginSuccess implements Action {
    static Type = action('[Login] Login Success');

    type = LoginSuccess.Type;
    constructor(public payload: User) { }
}

export class LoginFailure implements Action {
    static Type = action('[Login] Login Failure');

    type = LoginFailure.Type;
    constructor(public payload: string) { }
}

export class Logout implements Action {
    static Type = action('[Login] Logout');

    type = Logout.Type;
    constructor() { }
}

export class LogoutSuccess implements Action {
    static Type = action('[Login] Logout Success');

    type = LogoutSuccess.Type;
    constructor() { }
}

export type Actions
    = Login | LoginSuccess | LoginFailure
    | Logout | LoginSuccess;



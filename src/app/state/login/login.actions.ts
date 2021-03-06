import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { action } from '../action.cache';

export class LoginRedirect implements Action {
    static Type = action('[Login] Login Redirect');

    type = LoginRedirect.Type;
    constructor(public payload: string) { }
}

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

export class LoginRedirectCleanup implements Action {
    static Type = action('[Login] Login Redirect Cleanup');

    type = LoginRedirectCleanup.Type;
    constructor() { }
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

export type LoginActions
    = LoginRedirect | Login
    | LoginSuccess | LoginFailure | LoginRedirectCleanup
    | Logout | LoginSuccess;



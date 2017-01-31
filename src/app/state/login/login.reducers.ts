import { ActionReducer } from '@ngrx/store';
import * as login from './login.actions';
import { LoginState } from './login.state';

const initialState: LoginState = {
    logging: false,
    redirectUrl: null,
    loggedIn: false,
    user: null,
};

export const reducer: ActionReducer<LoginState> = (state: LoginState = initialState, action: login.LoginActions): LoginState => {
    switch (action.type) {

        case login.LoginRedirect.Type:
            return Object.assign({}, state, { redirectUrl: (<login.LoginRedirect>action).payload });

        case login.Login.Type:
            return Object.assign({}, state, { logging: true, loggedIn: false, user: (<login.Login>action).payload });

        case login.LoginSuccess.Type:
            return Object.assign({}, state, { logging: false, loggedIn: true, user: (<login.LoginSuccess>action).payload });

        case login.LoginRedirectCleanup.Type:
            return Object.assign({}, state, { redirectUrl: null });

        case login.LoginFailure.Type:
            return Object.assign({}, state, { logging: false, loggedIn: false });

        case login.LogoutSuccess.Type:
            return Object.assign({}, initialState);

        default:
            return state;
    }
};

export const getLogging = (state: LoginState) => state.logging;
export const getRedirectUrl = (state: LoginState) => state.redirectUrl;
export const getLoggedIn = (state: LoginState) => state.loggedIn;
export const getUser = (state: LoginState) => state.user;



import * as login from './login.actions';
import { LoginState } from './login.state';

const initialLoginState: LoginState = {
    logging: false,
    redirectUrl: null,
    loggedIn: false,
    user: null
};

export function reducer(state = initialState, action: login.Actions): LoginState {
    switch (action.type) {

        case login.LoginRedirect.Type : {
            return Object.assign({}, state, { redirectUrl: action.payload });
        } break;

        case login.Login.Type : {
            return Object.assign({}, state, { logging: true, loggedIn: false, user: (<login.Login>action).payload });
        } break;

        case login.LoginSuccess.Type : {
            return Object.assign({}, state, { logging: false, loggedIn: true, user: (<login.LoginSuccess>action).payload });
        } break;

        case login.LoginFailure.Type : {
            return Object.assign({}, state, { logging: false, loggedIn: false });
        } break;

        case login.LogoutSuccess.Type : {
            return Object.assign({}, initialState);
        } break;

        default: {
            return state;
        }
    }
}

export const getLogging = (state: LoginState) => state.logging;
export const getRedirectUrl = (state: LoginState) => state.redirectUrl;
export const getLoggedIn = (state: LoginState) => state.loggedIn;
export const getUser = (state: LoginState) => state.user;

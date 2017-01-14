import { User } from '../../models/user';
import * as login from './login.actions';

export interface LoginState {
    logging: boolean;
    loggedIn: boolean;
    user: User;
}

const initialState: LoginState = {
    logging: false,
    loggedIn: false,
    user: null
};


export function reducer(state = initialState, action: login.Actions): LoginState {
    switch (action.type) {

        case login.Login.Type : {
            return Object.assign({}, state, { logging: true, loggedIn: false, user: (<login.Login>action).payload });
        }

        case login.LoginSuccess.Type : {
            return Object.assign({}, state, {logging: false, loggedIn: true, user: (<login.LoginSuccess>action).payload});
        }

        case login.LoginFailure.Type : {
            return Object.assign({}, state, {logging: false, loggedIn: false});
        }

        case login.LogoutSuccess.Type : {
            return Object.assign({}, initialState);
        }

        default: {
            return state;
        }
    }
}

export const getLogging = (state: LoginState) => state.logging;

export const getLoggedIn = (state: LoginState) => state.loggedIn;

export const getUser = (state: LoginState) => state.user;

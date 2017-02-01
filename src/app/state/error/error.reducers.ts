import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { ErrorState } from './error.state';
import * as login from '../login';

const initialState: ErrorState = {
    errorMessage: null
};

export const reducer = (state = initialState, action: Action): ErrorState => {
    switch (action.type) {

        case login.LoginSuccess.Type:
            return Object.assign({}, state, { errorMessage: null });

        case login.LoginFailure.Type:
            return Object.assign({}, state, { errorMessage: (<login.LoginFailure>action).payload });

        default:
            return state;
    }
};

export const getErrorMessage = (state: ErrorState) => state.errorMessage;

export const getHasError = createSelector(getErrorMessage, (errorMessage) => {
    return !(errorMessage == null || errorMessage.length === 0);
});


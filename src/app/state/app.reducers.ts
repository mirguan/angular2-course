import { createSelector } from 'reselect';
import { combineReducers, ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { AppState } from './app.state';
import * as login from './login/login.reducers';
import * as course from './course/course.reducers';
import * as error from './error/error.reducers';

const reducers = {
    login: login.reducer,
    course: course.reducer,
    error: error.reducer
};

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function appReducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}

export const getLoginState = (state: AppState) => state.login;

export const getLogging = createSelector(getLoginState, login.getLogging);
export const getRedirectUrl = createSelector(getLoginState, login.getRedirectUrl);
export const getLoggedIn = createSelector(getLoginState, login.getLoggedIn);
export const getUser = createSelector(getLoginState, login.getUser);

export const getCourseState = (state: AppState) => state.course;

export const getLoading = createSelector(getCourseState, course.getLoading);
export const getCourses = createSelector(getCourseState, course.getCourses);
export const getSelectedCourseId = createSelector(getCourseState, course.getSelectedCourseId);
export const getSelectedCourse = createSelector(getCourseState, course.getSelectedCourse);

export const getErrorState = (state: AppState) => state.error;
export const getErrorMessage = createSelector(getErrorState, error.getErrorMessage);
export const getHasError = createSelector(getErrorState, error.getHasError);

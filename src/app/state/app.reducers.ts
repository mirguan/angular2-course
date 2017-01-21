import { createSelector } from 'reselect';
import { combineReducers } from '@ngrx/store';
import { AppState } from './app.state';
import * as login from './login/login.reducers';
import * as course from './course/course.reducers';

const reducers = {
    login: login.reducer,
    course: course.reducer
};

export function appReducer(state: any, action: any) {
    return combineReducers(reducers);
};

export const getLoginState = (state: AppState) => state.login;

export const getLoginLogging = createSelector(getLoginState, login.getLogging);
export const getLoginRedirectUrl = createSelector(getLoginState, login.getRedirectUrl);
export const getLoginLoggedIn = createSelector(getLoginState, login.getLoggedIn);
export const getLoginUser = createSelector(getLoginState, login.getUser);

export const getCourseState = (state: AppState) => state.course;

export const getCourseLoading = createSelector(getCourseState, course.getLoading);
export const getCourses = createSelector(getCourseState, course.getCourses);


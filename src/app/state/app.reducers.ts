import { createSelector } from 'reselect';
import { combineReducers } from '@ngrx/store';
import { AppState } from './app.state';
import { LoginState } from './login/login.state';
import { CourseState } from './course/course.state';
import * as login from './login/login.reducers';
import * as course from './course/course.reducers';

const reducers = {
    login: login.reducer,
    course: course.reducer
};

export function appReducer(state: any, action: any) {
    return combineReducers(reducers);
};

export const getLogging = (state: LoginState) => state.logging;
export const getRedirectUrl = (state: LoginState) => state.redirectUrl;
export const getLoggedIn = (state: LoginState) => state.loggedIn;
export const getUser = (state: LoginState) => state.user;

export const getLoginState = (state: AppState) => state.login;

export const getLoginLogging = createSelector(getLoginState, getLogging);
export const getLoginRedirectUrl = createSelector(getLoginState, getRedirectUrl);
export const getLoginLoggedIn = createSelector(getLoginState, getLoggedIn);
export const getLoginUser = createSelector(getLoginState, getUser);

export const getLoading = (state: CourseState) => state.loading;
export const getCourses = (state: CourseState) => state.courses;

export const getCourseState = (state: AppState) => state.course;

export const getCourseLoading = createSelector(getCourseState, getLoading);
export const getCourseCourses = createSelector(getCourseState, getCourses);


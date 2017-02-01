import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as course from './course.actions';
import { CourseState } from './course.state';
import { Course } from '../../models/course';

const initialState: CourseState = {
    loading: false,
    courses: [],
    selectedCourseId: null,
    query: ''
};

export const reducer:  ActionReducer<CourseState> = (state: CourseState = initialState, action: course.CourseActions): CourseState => {
    switch (action.type) {

        case course.LoadCourses.Type:
            return Object.assign({}, state, { loading: true });

        case course.LoadCoursesComplete.Type:
            return Object.assign({}, state, { loading: false, courses: (<course.LoadCoursesComplete>action).payload });

        case course.AddCourseSuccess.Type:
            return Object.assign({}, state, {
                courses: [...state.courses, (<course.AddCourseSuccess>action).payload]});

        case course.DeleteCourseSuccess.Type:
            let data: Course = (<course.DeleteCourse>action).payload;
            return Object.assign({}, state, { courses: state.courses.filter( item => item.id !== data.id) });

        case course.SelectCourse.Type:
            return Object.assign({}, state, { selectedCourseId: (<course.SelectCourse>action).payload });

        case course.CleanCourseSelection.Type:
            return Object.assign({}, state, { selectedCourseId: null });

        case course.SearchCourses.Type:
            return Object.assign({}, state, { loading: true, query: (<course.SearchCourses>action).payload});

        case course.SearchCoursesComplete.Type:
            return Object.assign({}, state, { loading: false, courses: (<course.LoadCoursesComplete>action).payload });

        default:
            return state;
    }
};

export const getLoading = (state: CourseState) => state.loading;
export const getCourses = (state: CourseState) => state.courses;
export const getSelectedCourseId = (state: CourseState) => state.selectedCourseId;

export const getSelectedCourse = createSelector(getCourses, getSelectedCourseId, (entities, selectedId) => {
    let id: number = +selectedId;
    if (id) {
        return entities.filter(item => item.id === id);
    }
    return new Course();
});

export const getQuery = (state: CourseState) => state.query;

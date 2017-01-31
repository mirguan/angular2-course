import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as course from './course.actions';
import { CourseState } from './course.state';
import { Course } from '../../models/course';

const initialState: CourseState = {
    loading: false,
    courses: [],
    selectedCourseId: null
};

export const reducer:  ActionReducer<CourseState> = (state: CourseState = initialState, action: course.CourseActions): CourseState => {
    switch (action.type) {

        case course.LoadCourseAction.Type:
            return Object.assign({}, state, { loading: true });

        case course.LoadCourseActionSuccess.Type:
            return Object.assign({}, state, { loading: false, courses: (<course.LoadCourseActionSuccess>action).payload });

        case course.AddCourseActionSuccess.Type:
            return Object.assign({}, state, {
                courses: [...state.courses, (<course.AddCourseActionSuccess>action).payload]});

        case course.DeleteCourseActionSuccess.Type:
            let data: Course = (<course.DeleteCourseAction>action).payload;
            return Object.assign({}, state, { courses: state.courses.filter( item => item.id !== data.id) });

        case course.SelectCourse.Type:
            return Object.assign({}, state, { selectedCourseId: (<course.SelectCourse>action).payload });

        case course.CleanCourseSelection.Type:
            return Object.assign({}, state, { selectedCourseId: null });

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

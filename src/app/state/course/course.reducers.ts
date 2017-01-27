import { ActionReducer } from '@ngrx/store';
import * as course from './course.actions';
import { CourseState } from './course.state';
import { Course } from '../../models/course';

const initialState: CourseState = {
    loading: false,
    courses: []
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

        default:
            return state;
    }
};

import * as course from './course.actions';
import { CourseState } from './course.state';
import { Course } from '../../models/course';

const initialState: CourseState = {
    loading: false,
    courses: []
};

export function reducer(state = initialState, action: login.Actions): CourseState {
    switch (action.type) {

        case course.LoadCourseAction.Type : {
            return Object.assign({}, state, { loading: true });
        } break;

        case course.LoadCourseActionSuccess.Type : {
            let courses: Course[] = action.payload;
            return Object.assign({}, state, { loading: false, courses: courses });
        } break;

        case course.AddCourseActionSucess.Type : {
            let course: Course = action.payload;
            return Object.assign({}, state, { courses: [...state.courses, course] });
        } break;

        case course.DeleteCourseAction.Type : {
            let course: Course = action.payload;
            return Object.assign({}, state, { courses: state.courses.filter( item => item.id !== course.id) });
        } break;

        default: {
            return state;
        }
    }
}

export const getLoading = (state: CourseState) => state.loading;
export const getCourses = (state: CourseState) => state.courses;

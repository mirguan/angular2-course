import { LoginState } from './login/login.reducers';
import { CourseState } from './course/course.reducers';

export interface State {
    login: LoginState;
    course: CourseState;
}

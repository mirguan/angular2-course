import { LoginState } from './login/login.reducers';
import { CourseState } from './course/course.reducers';

export interface AppState {
    login: LoginState;
    course: CourseState;
}

import { LoginState } from './login/login.state';
import { CourseState } from './course/course.state';

export interface AppState {
    login: LoginState;
    course: CourseState;
}

import { LoginState } from './login/login.state';
import { CourseState } from './course/course.state';
import { ErrorState } from './error/error.state';

export interface AppState {
    login: LoginState;
    course: CourseState;
    error: ErrorState;
}

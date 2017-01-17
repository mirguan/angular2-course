import { Course } from '../../models/course';

export interface CourseState {
    logging: boolean;
    courses: Course[];
}

const initialState: CourseState = {
    logging: false,
    courses: null
};

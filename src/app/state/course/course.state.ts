import { Course } from '../../models/course';

export interface CourseState {
    loading: boolean;
    courses: Course[];
    selectedCourseId: string;
}

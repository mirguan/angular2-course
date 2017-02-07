import { Course } from '../../models/course';

export enum CourseStatus {
    None = 1,
    InAction = 2,
    ActionSuccess = 3,
    ActionFailed = 4,
    Cancel = 5
}
export interface CourseState {
    loading: boolean;
    courses: Course[];
    selectedCourseId: string;
    selectedCourseStatus: CourseStatus;
    query: string;
}

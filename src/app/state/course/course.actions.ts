import { Action } from '@ngrx/store';
import { Course } from '../../models/course';
import { action } from '../action.cache';

export class AddCourse implements Action {
    static Type = action('[Course] Add');

    type = AddCourse.Type;
    constructor(public payload: Course) { }
}

export class AddCourseSuccess implements Action {
    static Type = action('[Course] Add Success');

    type = AddCourseSuccess.Type;
    constructor(public payload: Course) { }
}

export class GetCourse implements Action {
    static Type = action('[Course] Get');

    type = SaveCourse.Type;
    constructor(public payload: Course) { }
}

export class SelectCourse implements Action {
    static Type = action('[Course] Select');

    type = SelectCourse.Type;
    constructor(public payload: string) { }
}

export class CleanCourseSelection implements Action {
    static Type = action('[Course] Clean Selection');

    type = CleanCourseSelection.Type;
    constructor(public payload: string) { }
}

export class SaveCourse implements Action {
    static Type = action('[Course] Save');

    type = SaveCourse.Type;
    constructor(public payload: Course) { }
}

export class SaveCourseSuccess implements Action {
    static Type = action('[Course] Save Success');

    type = SaveCourse.Type;
    constructor(public payload: Course) { }
}

export class DeleteCourse implements Action {
    static Type = action('[Course] Delete');

    type = DeleteCourse.Type;
    constructor(public payload: Course) { }
}

export class DeleteCourseSuccess implements Action {
    static Type = action('[Course] Delete Success');

    type = DeleteCourseSuccess.Type;
    constructor(public payload: Course) { }
}

export class LoadCourses implements Action {
    static Type = action('[Course] Load');

    type = LoadCourses.Type;
    constructor() { }
}

export class LoadCoursesComplete implements Action {
    static Type = action('[Course] Load Complete');

    type = LoadCoursesComplete.Type;
    constructor(public payload: Course[]) { }
}

export class SearchCourses implements Action {
    static Type = action('[Course] Search');

    type = SearchCourses.Type;
    constructor(public payload: string) { }
}

export class SearchCoursesComplete implements Action {
    static Type = action('[Course] Search Complete');

    type = SearchCoursesComplete.Type;
    constructor(public payload: Course[]) { }
}

export type CourseActions
    = AddCourse | AddCourseSuccess
    | GetCourse | SaveCourse
    | DeleteCourse | DeleteCourseSuccess
    | LoadCourses | LoadCoursesComplete
    | SelectCourse| CleanCourseSelection
    | SearchCourses| SearchCoursesComplete;

import { Action } from '@ngrx/store';
import { Course } from '../../models/course';
import { action } from '../action.cache';

export class AddCourseAction implements Action {
    static Type = action('[Course] Add');

    type = AddCourseAction.Type;
    constructor(public payload: Course) { }
}

export class AddCourseActionSuccess implements Action {
    static Type = action('[Course] Add Success');

    type = AddCourseActionSuccess.Type;
    constructor(public payload: Course) { }
}

export class EditCourseAction implements Action {
    static Type = action('[Course] Edit');

    type = EditCourseAction.Type;
    constructor(public payload: Course) { }
}


export class DeleteCourseAction implements Action {
    static Type = action('[Course] Delete');

    type = DeleteCourseAction.Type;
    constructor(public payload: Course) { }
}

export class LoadCourseAction implements Action {
    static Type = action('[Course] Load');

    type = LoadCourseAction.Type;
    constructor() { }
}

export class LoadCourseActionSuccess implements Action {
    static Type = action('[Course] Load Success');

    type = LoadCourseActionSuccess.Type;
    constructor(public payload: Course[]) { }
}

export type Actions
    = AddCourseAction | AddCourseActionSuccess
    | EditCourseAction
    | DeleteCourseAction
    | LoadCourseAction | LoadCourseActionSuccess;

import { Action } from '@ngrx/store';
import { Course } from '../../models/course';
import { action } from '../action.cache';

export class AddCourseAction implements Action {
    static Type = action('[Course] Add');

    type = this.Type;
    constructor(public payload: Course) { }
}

export class AddCourseActionSuccess implements Action {
    static Type = action('[Course] Add Success');

    type = this.Type;
    constructor(public payload: Course) { }
}

export class EditCourseAction implements Action {
    static Type = action('[Course] Edit');

    type = this.Type;
    constructor(public payload: Course) { }
}


export class DeleteCourseAction implements Action {
    static Type = action('[Course] Delete');

    type = this.Type;
    constructor(public payload: Course) { }
}

export class LoadCourseAction implements Action {
    static Type = action('[Course] Load');

    type = this.Type;
    constructor() { }
}

export class LoadCourseActionSuccess implements Action {
    static Type = action('[Course] Load Success');

    type = this.Type;
    constructor(public payload: Course[]) { }
}

export type Actions
    = AddCourseAction | AddCourseActionSuccess
    | EditCourseAction
    | DeleteCourseAction
    | LoadCourseAction | LoadCourseActionSuccess;

/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import * as course from './course.actions';

@Injectable()
export class CourseEffects {
    constructor(private actions: Actions, private courseService: CourseService) { }

    @Effect()
    load$: Observable<Action> = this.actions
        .ofType(course.LoadCourseAction.Type)
        .switchMap(() => this.courseService.load()
            .map(data => new course.LoadCourseActionSuccess(<Course[]>data))
        );

    @Effect()
    add$: Observable<Action> = this.actions
        .ofType(course.AddCourseAction.Type)
        .switchMap(action => this.courseService.add(<Course>action.payload)
            .map(data => new course.AddCourseActionSuccess(<Course>data))
        );

    @Effect()
    delete$: Observable<Action> = this.actions
        .ofType(course.DeleteCourseAction.Type)
        .switchMap(action => this.courseService.delete(<Course>action.payload)
            .map(data => new course.DeleteCourseActionSuccess(<Course>data))
        );
}

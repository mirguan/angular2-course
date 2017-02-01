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
        .ofType(course.LoadCourses.Type)
        .switchMap(() => this.courseService.load()
            .map(data => new course.LoadCoursesComplete(<Course[]>data))
        );

    @Effect()
    add$: Observable<Action> = this.actions
        .ofType(course.AddCourse.Type)
        .switchMap(action => this.courseService.add(<Course>action.payload)
            .map(data => new course.AddCourseSuccess(<Course>data))
        );

    @Effect()
    save: Observable<Action> = this.actions
        .ofType(course.SaveCourse.Type)
        .switchMap(action => this.courseService.save(<Course>action.payload)
            .map(data => new course.SaveCourseSuccess(<Course>data))
        );

    @Effect()
    delete$: Observable<Action> = this.actions
        .ofType(course.DeleteCourse.Type)
        .switchMap(action => this.courseService.delete(<Course>action.payload)
            .map(data => new course.DeleteCourseSuccess(<Course>data))
        );
}

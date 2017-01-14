import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Course } from '../../models/course';
import { CourseActions } from './course.actions';
import { CourseService } from '../../course/course.service';

@Injectable()
export class CourseEffects {
    constructor(private actions: Actions, private courseService: CourseService) { }
}

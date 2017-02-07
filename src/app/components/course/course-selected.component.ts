import {Component, Injectable, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import * as state from '../../state';

@Injectable()
@Component({
    selector: 'app-course-selected',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-course-edit [course]="course | async"></app-course-edit>
    `
})
export class CourseSelectedComponent{
    course: Observable<Course>;

    constructor(private router: Router, private store: Store<state.AppState>, route: ActivatedRoute) {
        this.course = store.select(state.getSelectedCourse);
    }
}

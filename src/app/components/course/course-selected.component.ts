import { Component, Injectable, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import * as state from '../../state';

@Injectable()
@Component({
    selector: 'app-course-selected',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-course-edit
            [course]="course | async"
            (save)="save($event)">
        </app-course-edit>
    `
})
export class CourseSelectedComponent {
    course: Observable<Course>;

    constructor(private store: Store<state.AppState>, route: ActivatedRoute) {
        this.course = store.select(state.getSelectedCourse);
    }

    save(course: Course) {
        if (course.id) {
            this.store.dispatch(new state.SaveCourse(course));
        } else {
            this.store.dispatch(new state.AddCourse(course));
        }
    }
}

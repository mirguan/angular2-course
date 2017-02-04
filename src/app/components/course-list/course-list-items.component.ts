import { Component, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as state from '../../state';
import { Course } from '../../models/course';

@Injectable()
@Component({
    selector: 'app-course-list-items',
    template: `
        <app-course-list-item *ngFor="let course of courses" [course]="course" (edit)="edit($event)" (delete)="delete($event)"></app-course-list-item>
    `
})
export class CourseListItemsComponent {
    @Input() courses: Course[];

    constructor(private router: Router, private store: Store<state.AppState>) {
    }

    edit(course: Course) {
        Observable.fromPromise(this.router.navigate(['courses', course.id]));
    }

    delete(course: Course) {
        this.store.dispatch(new state.DeleteCourse(course));
    }
}

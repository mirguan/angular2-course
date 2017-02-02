import { Component, Injectable, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import * as state from '../../state';

@Injectable()
@Component({
    selector: 'app-course-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-course-search [query]="searchQuery | async" [searching]="loading | async" (search)="search($event)"></app-course-search>
        <button type="button" (click)="add()">Add Course</button>
        <app-course-list-items [courses]="courses | async"></app-course-list-items>
    `
})
export class CourseListComponent {
    searchQuery: Observable<string>;
    courses: Observable<Course[]>;
    loading: Observable<boolean>;

    constructor(private store: Store<state.AppState>) {
        this.searchQuery = store.select(state.getCourseQuery);
        this.courses = store.select(state.getCourses);
        this.loading = store.select(state.getCoursesLoading);

        this.store.dispatch(new state.LoadCourses());
    }

    search(query: string) {
        this.store.dispatch(new state.SearchCourses(query));
    }

    add() {
        this.store.dispatch(new state.SelectCourse('new'));
    }
}

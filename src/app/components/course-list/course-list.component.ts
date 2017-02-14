import { Component, Injectable, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as state from '../../state';
import { Course } from '../../models/course';

@Injectable()
@Component({
    selector: 'app-course-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutWrap class="item-box">
            <div fxFlex class="search-box">
                <app-course-search [query]="searchQuery | async" (search)="search($event)"></app-course-search>
            </div>
            <div fxFlex="140px">
                <button type="button" class="btn btn-primary btn-block" (click)="add()">Add Course</button>
            </div>
        </div>    
        <app-course-list-items [courses]="courses | async"></app-course-list-items>
    `,
    styles: [`
        .item-box {
            margin-top: 0.3rem;
            margin-bottom: 0.3rem;
        }
        .search-box {
            margin-right: 0.3rem;
        }
    `]
})
export class CourseListComponent {
    searchQuery: Observable<string>;
    courses: Observable<Course[]>;
    loading: Observable<boolean>;

    constructor(private router: Router, private store: Store<state.AppState>) {
        this.searchQuery = store.select(state.getCourseQuery);
        this.courses = store.select(state.getQueriedCourses);
        this.loading = store.select(state.getCoursesLoading);
    }

    search(query: string) {
        this.store.dispatch(new state.SearchCourses(query));
    }

    add() {
        Observable.fromPromise(this.router.navigate(['courses', 'new']));
    }
}

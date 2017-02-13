import {Component, Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isUndefined } from 'util';
import { Course } from '../models/course';
import * as state from '../state';

@Injectable()
@Component({
    selector: 'app-breadcrumb',
    template: `
        <nav class="breadcrumb app-header" [ngSwitch]="selectedCourseExists | async">
            <a *ngSwitchCase="true" class="breadcrumb-item" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}" [routerLink]=" ['./courses'] ">Courses</a>
            <a *ngSwitchCase="true" class="breadcrumb-item">{{selectedCourseName | async}}</a>
            <a *ngSwitchCase="false" class="breadcrumb-item">Courses</a>
        </nav>
    `,
    styles: [`
        .app-header {
            background-color: #f0f2f5;
            padding-top: 0.3rem!important;
            padding-left: 0!important;
            padding-right: 0!important;
            margin-bottom: 0rem;!important;
        }
    `]
})
export class AppBreadcrumbComponent {
    selectedCourse: Observable<Course>;
    selectedCourseName: Observable<string>;
    selectedCourseExists: Observable<boolean>;

    constructor(private store: Store<state.AppState>) {
        this.selectedCourse = store.select(state.getSelectedCourse);

        this.selectedCourseExists = this.selectedCourse
            .map(course => course != null)
            .switchMap(exists => { return Observable.of(exists); });

        this.selectedCourseExists.subscribe(exists => {
            console.log(exists);
        });

        this.selectedCourseName = this.selectedCourse
            .filter(course => course != null)
            .map(course => {
                if (course.id === 0 || isUndefined(course.id)) {
                    return 'New Course';
                }
                return course.title;
            });
    }
}


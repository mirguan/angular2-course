import {Component, Injectable, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../../state';
import * as course from '../../state/course';

@Injectable()
@Component({
    selector: 'app-course',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-course-selected></app-course-selected>
    `
})
export class CourseComponent implements OnDestroy {
    actionsSubscription: Subscription;

    constructor(private store: Store<AppState>, route: ActivatedRoute) {
        this.actionsSubscription = route.params
            .select<string>('id')
            .map(id => new course.SelectCourse(id))
            .subscribe(store);
    }

    ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
    }
}

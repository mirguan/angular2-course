import { Component, Injectable, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as state from '../../state';
import * as course from '../../state/course';

@Injectable()
@Component({
    selector: 'app-course-placeholder',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <button class="btn btn-primary" (click)="cancel()">Return</button>
        <app-course-edit></app-course-edit>
    `
})
export class CourseComponent implements OnDestroy {
    actionsSubscription: Subscription;
    subscription: Subscription;

    constructor(private router: Router, private store: Store<state.AppState>, private route: ActivatedRoute) {
        this.actionsSubscription = route.params
            .select<string>('id')
            .map(id => new course.SelectCourse(id))
            .subscribe(store);

        this.subscription =  store.select(state.getSelectedCourseStatus).subscribe(
            (status) => {
                if (status === state.CourseStatus.Cancel) {
                    Observable.fromPromise(this.router.navigate(['../'], {relativeTo: this.route}));
                }
                if (status === state.CourseStatus.ActionSuccess) {
                    Observable.fromPromise(this.router.navigate(['../'], {relativeTo: this.route}));
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
        this.subscription.unsubscribe();
        this.store.dispatch(new state.SelectCourse(null));
    }

    cancel() {
        Observable.fromPromise(this.router.navigate(['../'], {relativeTo: this.route}));
    }
}

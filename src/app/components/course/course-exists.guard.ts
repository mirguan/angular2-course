import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as state from '../../state';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Injectable()
export class CourseExistsGuard implements CanActivate {
    constructor(private router: Router, private store: Store<state.AppState>, private courseService: CourseService) { }

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        let param = route.params['id'];
        if (param === 'new') {
            return Observable.of(true);
        }

        let id: number = +param;
        if (id) {
            return this.courseExists(id);
        }

        return this.invalidCourseId();
    }

    courseExists(id: number): Observable<boolean> {
        return this.hasCourseInState(id)
            .switchMap(exists => {
                if (exists) {
                    return Observable.of(exists);
                }

                return this.hasCourseInApi(id);
            });
    }

    hasCourseInState(id: number): Observable<boolean> {
        return this.store.select(state.getCourses)
            .map(course => {
                let items: Course[] = course.filter(item => item.id === id);
                return items != null && items.length === 1;
            })
            .take(1);
    }

    hasCourseInApi(id: number): Observable<boolean> {
        return this.courseService.get(id)
            .map(course => new state.GetCourse(course))
            .do((action: state.GetCourse) => this.store.dispatch(action))
            .map(course => !!course)
            .catch(() => this.invalidCourseId());
    }

    invalidCourseId(): Observable<boolean> {
        Observable.fromPromise(this.router.navigate(['/404']));
        return Observable.of(false);
    }
}

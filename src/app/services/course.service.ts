import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppConfigService } from '../app.config.service';
import * as state from '../state';
import { getLoggedUser } from '../state/app.reducers';
import { Course, User } from '../models';

@Injectable()
export class CourseService  {
    options: RequestOptions;

    constructor(private config: AppConfigService, private http: Http, private store: Store<state.AppState>) {
        this.store.select(getLoggedUser)
            .filter(user => !!user && !!user.token)
            .subscribe((user: User) => {
                let headers: Headers = new Headers();
                headers.append('Content-Type', 'Bearer ' + 'application/json');
                headers.append('Authorization', 'Bearer ' + user.token);

                this.options = new RequestOptions({ headers: headers });
            });
    }

    load(): Observable<Course[]> {
        return this.http.get(`${this.config.apiUrl}/courses`, this.options)
            .map((response: Response) => response.json() || []);
    }

    add(course: Course): Observable<Course> {
        return this.http.post(`${this.config.apiUrl}/courses`, JSON.stringify(course), this.options)
            .map((response: Response) => course);
    }

    save(course: Course): Observable<Course> {
        return this.http.put(`${this.config.apiUrl}/courses`, JSON.stringify(course), this.options)
            .map((response: Response) => course);
    }

    delete(course: Course): Observable<Course> {
        return this.http.delete(`${this.config.apiUrl}/courses/${course.id}`, this.options)
            .map((response: Response) => course);
    }
}

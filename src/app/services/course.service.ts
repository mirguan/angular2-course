import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppConfigService } from '../app.config.service';
import * as state from '../state';
import { Course  } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class CourseService extends BaseService {
    constructor(config: AppConfigService, http: Http, store: Store<state.AppState>) {
        super(config, http, store);
    }

    load(): Observable<Course[]> {
        return this.http.get(`${this.config.apiUrl}/courses`, this.options)
            .map((response: Response) => response.json() || []);
    }

    add(course: Course): Observable<Course> {
        return this.http.post(`${this.config.apiUrl}/courses`, JSON.stringify(course), this.options)
            .map((response: Response) => course);
    }

    get(id: number): Observable<Course> {
        return this.http.get(`${this.config.apiUrl}/courses/${id}`, this.options)
            .map((response: Response) => {
                if (!response.ok) {
                    throw new Error(`Error state: '${response.status}'`);
                }
                return response.json();
            });
    }

    save(course: Course): Observable<Course> {
        return this.http.put(`${this.config.apiUrl}/courses/${course.id}`, JSON.stringify(course), this.options)
            .map((response: Response) => course);
    }

    delete(course: Course): Observable<Course> {
        return this.http.delete(`${this.config.apiUrl}/courses/${course.id}`, this.options)
            .map((response: Response) => course);
    }
}

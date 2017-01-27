import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { ConfigService } from '../app.config.service';

@Injectable()
export class CourseService {
    constructor(private config: ConfigService, private http: Http) {
    }

    load(): Observable<Course[]> {
        return this.http.get(`${this.config.apiUrl}/courses`)
            .map((response: Response) => response.json() || []);
    }

    add(course: Course): Observable<Course> {
        return this.http.post(`${this.config.apiUrl}/courses`, JSON.stringify(course))
            .map((response: Response) => course);
    }

    delete(course: Course): Observable<Course> {
        return this.http.delete(`${this.config.apiUrl}/courses/${course.id}`)
            .map((response: Response) => course);
    }
}

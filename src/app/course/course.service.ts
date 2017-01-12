import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Course } from "../models/course";
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {
    constructor(private http: Http) {
    }
}

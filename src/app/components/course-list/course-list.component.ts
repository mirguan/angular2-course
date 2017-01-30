import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Injectable()
@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html'
})
export class CourseListComponent {
    constructor(private router: Router, private courseService: CourseService) {
    }
}

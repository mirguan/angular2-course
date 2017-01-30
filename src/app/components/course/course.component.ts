import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Injectable()
@Component({
    selector: 'app-course',
    templateUrl: './course.component.html'
})
export class CourseComponent {
    constructor(private router: Router, private courseService: CourseService) {
    }
}

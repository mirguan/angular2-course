import { Component, Injectable, Input } from '@angular/core';
import { Course } from '../../models/course';

@Injectable()
@Component({
    selector: 'app-course-list-item',
    template: `
        
    `
})
export class CourseListItemComponent {
    @Input() course: Course;
}

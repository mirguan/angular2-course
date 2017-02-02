import { Component, Injectable, Input } from '@angular/core';
import { Course } from '../../models/course';

@Injectable()
@Component({
    selector: 'app-course-list-item',
    template: `
        {{course.id}}
        {{course.title}}
        {{course.description}}
        {{course.createDate | date: 'mm.dd.yyyy'}}
        {{course.duration | duration}}
    `
})
export class CourseListItemComponent {
    @Input() course: Course;
}

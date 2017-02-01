import { Component, Injectable, Input } from '@angular/core';
import { Course } from '../../models/course';

@Injectable()
@Component({
    selector: 'app-course-list-items',
    template: `
        <app-course-list-item *ngFor="let course of courses" [course]="course"></app-course-list-item>
    `
})
export class CourseListItemsComponent {
    @Input() courses: Course[];
}

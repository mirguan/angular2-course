import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course';

@Component({
    selector: 'app-course-edit',
    template: `
    `
})
export class CourseEditComponent {
    @Input() course: Course;
    @Output() save = new EventEmitter<Course>();

    constructor() {
    }
}

import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';

@Injectable()
@Component({
    selector: 'app-course-search',
    template: `
    `
})
export class CourseSearchComponent {
    @Input() query = '';
    @Input() searching = false;
    @Output() search = new EventEmitter<string>();
}

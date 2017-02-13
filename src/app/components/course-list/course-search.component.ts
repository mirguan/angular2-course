import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';

@Injectable()
@Component({
    selector: 'app-course-search',
    template: `
        <input type="text" id="search" class="form-control search-box" placeholder="Search" />
    `,
    styles: [`
        .search-box {
            margin-right: 4rem;
        }
    `]
})
export class CourseSearchComponent {
    @Input() query = '';
    @Input() searching = false;
    @Output() search = new EventEmitter<string>();
}

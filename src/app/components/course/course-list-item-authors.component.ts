import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Author } from '../../models/author';

@Component({
    selector: 'app-course-list-item-authors',
    template: `
        <h6>Authors:
            <span *ngFor="let author of authors; let last = last">{{author.name}}{{last ? '' : ', '}}</span>
        </h6>
    `,
    styles: [`
    h6 {
        margin-top: -5px;
        font-size: 0.9rem;
    }
  `]
})
export class CourseListItemAuthorsComponent {
    @Input() authors: Author[];

    constructor() {
    }
}

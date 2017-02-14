import {Component, Injectable, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
@Component({
    selector: 'app-course-search',
    template: `
        <input type="text" id="search" class="form-control search-box" placeholder="Search" [(ngModel)]="query"/>
    `,
    styles: [`
        .search-box {
            margin-right: 4rem;
        }
    `]
})
export class CourseSearchComponent {
    @Input() query = '';
    @Input() delay = 300;
    @Output() search = new EventEmitter<string>();

    public inputValue: string;

    constructor(private elementRef: ElementRef) {
        const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.query)
            .startWith('')
            .debounceTime(this.delay)
            .distinctUntilChanged((x: string, y: string) => {
                return x === y || ( y.length > 0 && y.length < 3);
            });

        eventStream.subscribe(input => this.search.emit(input));
    }
}

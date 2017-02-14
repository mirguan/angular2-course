import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as state from '../../state';
import { Course } from '../../models/course';

@Injectable()
@Component({
    selector: 'app-course-list-item',
    template: `
        <div fxLayout="row" fxLayoutWrap class="item-box">
            <div fxLayout="row" fxLayoutWrap class="item-header p-2 m-1">
                <div fxFlex>
                    <div fxLayout="row" fxLayoutWrap>
                        <div fxFlex><h5 appHighlight [keyword]="searchQuery | async">{{course.title}}</h5></div>
                        <div fxFlex="70px" class="text-right"><h5><span class="badge badge-default">{{course.duration | duration}}</span></h5></div>
                        <div fxFlex="120px" class="text-right text-muted">{{course.createDate | date: 'MM.dd.yyyy'}}</div>
                    </div>
                    <div fxLayout="row" fxLayoutWrap>
                        <div fxFlex><app-course-list-item-authors [authors]="course.authors"></app-course-list-item-authors></div>
                        <div fxFlex="190x"></div>
                    </div>
                </div>
                <div fxFlex="110px" class="ml-2">
                    <div fxFlex="none" class="mb-1">
                        <button class="btn btn-outline-secondary btn-block btn-sm" type="button" (click)="edit.emit(course)">Edit course</button>
                    </div>
                    <div fxFlex="none">
                        <button class="btn btn-outline-warning btn-block btn-sm" type="button" (click)="delete.emit(course)">Delete</button>
                    </div>
                </div>
            </div>
            <div fxLayout="row" fxLayoutWrap class="item-body p-2 m-1">
                <div fxLayout="row" fxLayoutWrap>
                    <div fxFlex class="lead">
                        <app-read-more [text]="course.description" [maxLength]="150" [keyword]="searchQuery | async"></app-read-more>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .item-box {
            border: 1px solid #eae3e0;
        }

        .item-header {
            background-color: #f3f3f0;
            margin: 0 0 !important;
            width: 100%;
        }

        .item-body {
            background-color: #fefefe;
            margin: 0 0 !important;
            padding-top: .1rem !important;
            padding-bottom: .1rem !important;
        }

        .lead {
            font-size: 0.97rem;
            margin-bottom: .1rem !important;
        }
    `]
})
export class CourseListItemComponent {
    @Input() course: Course;
    @Output() edit = new EventEmitter<Course>();
    @Output() delete = new EventEmitter<Course>();

    searchQuery: Observable<string>;

    constructor(private store: Store<state.AppState>) {
        this.searchQuery = store.select(state.getCourseQuery);
    }
}

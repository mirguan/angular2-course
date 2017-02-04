import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';
import { Course } from '../../models/course';

@Injectable()
@Component({
    selector: 'app-course-list-item',
    template: `
        <div fxLayout="row" fxLayoutWrap class="item-box p-2 m-1">
            <div fxFlex>
                <div fxLayout="row" fxLayoutWrap>
                    <div fxFlex><h5>{{course.title}}</h5></div>
                    <div fxFlex="70px" class="text-right"><h5><span class="badge badge-default">{{course.duration | duration}}</span></h5></div>
                    <div fxFlex="120px" class="text-right">{{course.createDate | date: 'MM.dd.yyyy'}}</div>
                </div>
                <div fxLayout="row" fxLayoutWrap>
                    <div fxFlex>{{course.description}}</div>
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
    `,
    styles: [`
        .item-box {
            background-color: #faf3f0;
            border:1px solid #eae3e0;
        }
    `]
})
export class CourseListItemComponent {
    @Input() course: Course;
    @Output() edit = new EventEmitter<Course>();
    @Output() delete = new EventEmitter<Course>();
}

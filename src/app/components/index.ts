import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as login from './login';
import * as courses from './course-list';
import * as course from './course';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        login.LoginComponent,
        courses.CourseListComponent,
        course.CourseEditComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        login.LoginComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}


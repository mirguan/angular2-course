import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as login from './login';
import * as courses from './course-list';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        login.LoginComponent,
        courses.CourseListComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        login.LoginComponent
    ]
})
export class ComponentsModule {}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as login from './login/index';
import { CourseListComponent } from './course-list/index';
import { CourseComponent } from './course/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        login.LoginComponent,
        CourseListComponent,
        CourseComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        login.LoginComponent
    ],
    providers: [
        login.LoggedInGuard
    ]
})
export class ComponentsModule {}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as login from './login';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        login.LoginComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        login.LoginComponent
    ]
})
export class ComponentsModule {}


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { LoggedInGuard } from './login/login.guard';
import { LoginService } from './login/login.service';
import { CourseService } from './course/course.service';

import { backendProvider } from './server/backend.provider';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, {useHash: false})
    ],
    providers: [
        LoggedInGuard,
        LoginService,
        CourseService,
        backendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

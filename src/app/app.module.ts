﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppConfigService, AppComponent, appRoutes } from './';

import { LoginService, CourseService, AuthorService } from './services';

import { appReducer, CourseEffects, LoginEffects, AppEffects } from './state';
import { PipesModule } from './common/pipes';
import { ComponentsModule } from './components';

import { AppHeaderComponent } from './components/app-header.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { ReadMoreComponent } from './components/read-more.component';
import { ModalContentComponent } from './components/course/course-edit.component';

import * as login from './components/login';

import * as course from './components/course';
import * as courses from './components/course-list';

import { AppBreadcrumbComponent } from './common/breadcrumb.component';
import { HighlightDirective } from './common/highlight.directive';

import { backendMockFactory } from './server/backend.provider';

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        PageNotFoundComponent,
        ReadMoreComponent,
        HighlightDirective,

        course.CourseListItemComponent,
        course.CourseListItemAuthorsComponent,
        course.CourseEditComponent,
        course.CourseComponent,
        course.CourseAuthorsEditComponent,

        courses.CourseListComponent,
        courses.CourseListItemsComponent,
        courses.CourseSearchComponent,

        login.LoginPaneComponent,

        AppBreadcrumbComponent,
        ModalContentComponent
    ],
    entryComponents: [ModalContentComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        FlexLayoutModule.forRoot(),
        StoreModule.provideStore(appReducer),
        RouterModule.forRoot(appRoutes, {useHash: false}),
        EffectsModule.run(LoginEffects),
        EffectsModule.run(CourseEffects),
        EffectsModule.run(AppEffects),
        PipesModule,
        ComponentsModule
    ],
    providers: [
        AppConfigService,
        LoginService,
        CourseService,
        AuthorService,
        BaseRequestOptions,
        MockBackend,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: backendMockFactory
        },
        ComponentsModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

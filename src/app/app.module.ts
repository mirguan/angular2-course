import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppConfigService, AppComponent, appRoutes } from './';

import { LoggedInGuard } from './components/login';
import { LoginService, CourseService } from './services';

import { BackendProvider } from './server';
import { appReducer, CourseEffects, LoginEffects, AppEffects } from './state/index';
import { ComponentsModule } from './components';

import { CourseSelectedComponent } from './components/course/course-selected.component';
import { CourseComponent } from './components/course/course.component';

@NgModule({
    declarations: [
        AppComponent,
        CourseSelectedComponent,
        CourseComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, {useHash: false}),
        StoreModule.provideStore(appReducer),
        EffectsModule.run(LoginEffects),
        EffectsModule.run(CourseEffects),
        EffectsModule.run(AppEffects),
        ComponentsModule
    ],
    providers: [
        AppConfigService,
        LoggedInGuard,
        LoginService,
        CourseService,
        BackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

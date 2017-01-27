import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { LoggedInGuard } from './components/login/login.guard';
import { LoginService } from './services/login.service';
import { CourseService } from './services/course.service';

import { backendProvider } from './server/backend.provider';
import { appReducer, CourseEffects, LoginEffects, AppEffects } from './state/index';
import { ComponentsModule } from './components';

@NgModule({
    declarations: [
        AppComponent
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
        LoggedInGuard,
        LoginService,
        CourseService,
        backendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

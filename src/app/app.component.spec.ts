/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appReducer, CourseEffects, LoginEffects, AppEffects } from './state';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header.component';
import { AppBreadcrumbComponent } from './common/breadcrumb.component';
import * as login from './components/login';

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                AppHeaderComponent,
                AppBreadcrumbComponent,
                login.LoginPaneComponent
            ],
            imports: [
                RouterTestingModule,
                NgbModule.forRoot(),
                StoreModule.provideStore(appReducer)
            ]
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});

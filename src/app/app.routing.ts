import { Routes } from '@angular/router';
import { LoginComponent, LoggedInGuard } from './components/login';
import { CourseListComponent } from './components/course-list';
import { CourseComponent, CourseExistsGuard } from './components/course';
import { PageNotFoundComponent } from './components/page-not-found.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'courses', component: CourseListComponent, canActivate: [LoggedInGuard] },
    { path: 'courses/:id', component: CourseComponent, canActivate: [LoggedInGuard, CourseExistsGuard] },
    { path: '', redirectTo: 'courses', pathMatch: 'full', canActivate: [LoggedInGuard] },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '' }
];

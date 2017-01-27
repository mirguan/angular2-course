import { Routes } from '@angular/router';
import { LoginComponent, LoggedInGuard } from './components/login';
import { CourseListComponent } from './components/course-list';
import { CourseComponent } from './components/course';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: 'courses/:id', component: CourseComponent, canActivate: [LoggedInGuard] },
    { path: 'courses', component: CourseListComponent, canActivate: [LoggedInGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/courses' }
];

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { CoursesComponent } from './course';
import { CourseDetailsComponent } from './course';
import { LoggedInGuard } from './login/login.guard';


export const appRoutes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: 'courses/:id', component: CourseDetailsComponent, canActivate: [LoggedInGuard] },
    { path: 'courses', component: CoursesComponent, canActivate: [LoggedInGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/courses' }
];

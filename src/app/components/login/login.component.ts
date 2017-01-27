import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Injectable()
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    constructor(private router: Router, private loginService: LoginService) {
    }
}

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user";
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    token: string;
    user: User;

    redirectUrl: string;

    constructor(private http: Http) {
        let item = JSON.parse(localStorage.getItem('auth_token'));
        if (item) {
            this.token = item.token;
            this.user = item.user;
        }
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let data = response.json();
                if (data && data.token) {
                    // set token property
                    this.token = data.token;
                    this.user = data.user;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('auth_token', JSON.stringify({ user: this.user, token: this.token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null;
        this.user = null;
        localStorage.removeItem('auth_token');
    }

    loggedIn(): boolean {
        return this.token != null;
    }
}

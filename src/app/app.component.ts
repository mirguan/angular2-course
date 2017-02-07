import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col align-self-center">        
                    <app-header></app-header>
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./app.component.css']
})
export class AppComponent {
}

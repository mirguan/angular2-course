import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-page-not-found-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h2>404: Not Found</h2>
        <p>Course doesn't exist yet.</p>
        <p><a [routerLink]="['/courses']">Return to Home</a></p>
    `,
    styles: [`
        :host {
            text-align: center;
        }
    `]
})
export class PageNotFoundComponent { }

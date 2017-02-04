import { Component, Input, ElementRef, OnChanges  } from '@angular/core';

@Component({
    selector: 'app-read-more',
    template: `
        <div [innerHTML]="currentText">
        </div>
        <a [class.hidden]="hideToggle" class="btn btn-outline-secondary btn-toggle" (click)="toggleView()">Read {{isCollapsed? 'more':'less'}}</a>
    `,
    styles: [`
        .btn-toggle {
            margin-top: -5px;
            font-size: 0.7rem;
            padding: 0rem .2rem .1rem;
            cursor: pointer;
        }
    `]
})
export class ReadMoreComponent implements OnChanges  {
    @Input() text: string;
    @Input() maxLength = 100;

    currentText: string;
    hideToggle = true;

    isCollapsed = true;

    constructor() {
    }

    toggleView() {
        this.isCollapsed = !this.isCollapsed;
        this.determineView();
    }

    determineView() {
        if (this.text.length <= this.maxLength) {
            this.currentText = this.text;
            this.isCollapsed = false;
            this.hideToggle = true;
            return;
        }
        this.hideToggle = false;

        this.currentText = this.isCollapsed
            ? this.text.substring(0, this.maxLength) + '...'
            : this.text;
    }

    ngOnChanges() {
        this.determineView();
    }}

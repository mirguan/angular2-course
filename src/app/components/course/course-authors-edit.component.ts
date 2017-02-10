import { Component, Injectable, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import '@ngrx/core/add/operator/select';
import { Author } from '../../models/author';

@Injectable()
@Component({
    selector: 'app-course-authors-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutWrap class="item-box">
            <div fxFlex>
                <select class="form-control" multiple (change)="setCurrentSelected($event.target)" ngbTooltip="Selected Authors">
                    <option *ngFor="let author of getCurrentAuthors()" [value]="author">
                        {{author.name}}
                    </option>
                </select>
            </div>
            <div fxFlex="40px" class="item-delimiter">
                <div fxFlex="none" class="mb-1">
                    <button class="btn btn-secondary btn-block btn-sm" (click)="remove$($event)" ngbTooltip="Remove">></button>
                </div>
                <div fxFlex="none">
                    <button class="btn btn-secondary btn-block btn-sm" (click)="add$($event)" ngbTooltip="Add"><</button>
                </div>
            </div>
            <div fxFlex>
                <select class="form-control" multiple (change)="setAvailableSelected($event.target)"  ngbTooltip="Available Authors">
                    <option *ngFor="let author of getAvailableAuthors()" [value]="author">
                        {{author.name}}
                    </option>
                </select>
            </div>
        </div>
    `,
    styles: [`
        .item-box {
            margin: 0 0 !important;
            padding: 0 0 !important;
        }

        .item-delimiter {
            margin-left: 0.2rem !important;
            margin-right: 0.2rem !important;
        }
    `]
})
export class CourseAuthorsEditComponent {
    @Input() authors: Author[][];
    @Output() update = new EventEmitter<Author[]>();

    authors0: Author[];
    authors1: Author[];

    getCurrentAuthors(): Author[] {
        if (this.authors != null) {
            return this.authors[0];
        }
        return [];
    }

    getAvailableAuthors(): Author[] {
        if (this.authors != null) {
            return this.authors[1];
        }
        return [];
    }

    setCurrentSelected(element) {
        this.authors0 = [];
        for (let i = 0; i < element.options.length; i++) {
            let optionElement = element.options[i];

            if (optionElement.selected === true) {
                this.authors0.push(this.authors[0][i]);
            }
        }
    }

    setAvailableSelected(element) {
        this.authors1 = [];
        for (let i = 0; i < element.options.length; i++) {
            let optionElement = element.options[i];

            if (optionElement.selected === true) {
                this.authors1.push(this.authors[1][i]);
            }
        }
    }

    add$(event) {
        if (this.authors1 != null && this.authors1.length > 0) {
            let items: Author[] = [];
            for (let item of this.authors1) {
                items.push(item);
            }
            for (let item of this.authors[0]) {
                items.push(item);
            }
            this.update.emit(items);
        }
        event.preventDefault();
    }

    remove$(event) {
        if (this.authors0 != null && this.authors0.length > 0) {
            let items: Author[] = [];
            for (let item of this.authors[0]) {
                if (this.authors0.findIndex(value => value.id === item.id) === -1) {
                    items.push(item);
                }
            }
            this.update.emit(items);
        }
        event.preventDefault();
    }
}

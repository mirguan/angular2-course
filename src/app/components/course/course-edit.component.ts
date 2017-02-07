import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment/moment';
import * as state from '../../state';
import { Course } from '../../models/course';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-modal-content',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">Validation errors</h4>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <span *ngFor="let message of messages">
            {{message}}<br>
            </span>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
        </div>
    `
})
export class ModalContentComponent {
    @Input() messages: string[];

    constructor(public activeModal: NgbActiveModal) {}
}

@Component({
    selector: 'app-course-edit',
    templateUrl:  './course-edit.component.html'
})
export class CourseEditComponent {
    @Input() course: Course;

    subscription: Subscription;
    errorMessage: Observable<string>;
    hasError: Observable<boolean>;
    form: FormGroup;

    constructor(private router: Router, private store: Store<state.AppState>, private route: ActivatedRoute, private fb: FormBuilder, private modalService: NgbModal) {
        this.form = this.fb.group({
            'id': [0],
            'title': ['', Validators.compose([Validators.required])],
            'description': ['', Validators.compose([Validators.required])],
            'duration': [0, Validators.compose([Validators.required])],
            'createDate': ['', Validators.compose([Validators.required])],
            'authors': [[], Validators.compose([Validators.required])]
        });

        this.subscription = store.select(state.getSelectedCourse).
            subscribe(item => {
                if (item && item.id) {
                    this.form.controls['id'].setValue(item.id);
                    this.form.controls['title'].setValue(item.title);
                    this.form.controls['description'].setValue(item.description);
                    this.form.controls['duration'].setValue(item.duration);
                    this.form.controls['createDate'].setValue(moment.utc(item.createDate).format('YYYY-MM-DD'));
                    this.form.controls['authors'].setValue(item.authors);
                } else {
                    this.form.controls['id'].setValue(0);
                    this.form.controls['title'].setValue('');
                    this.form.controls['description'].setValue('');
                    this.form.controls['duration'].setValue(0);
                    this.form.controls['createDate'].setValue(moment.utc(Date.now()).format('YYYY-MM-DD'));
                    this.form.controls['authors'].setValue([]);
                }
            });
        this.subscription.unsubscribe();

        this.errorMessage = this.store.select(state.getErrorMessage);
        this.hasError = this.store.select(state.getHasError);
    }

    save(course: Course) {
        if (this.form.valid) {
            if (course != null) {
                if (course.id) {
                    this.store.dispatch(new state.SaveCourse(course));
                } else {
                    this.store.dispatch(new state.AddCourse(course));
                }
            }
        } else {
            const modal = this.modalService.open(ModalContentComponent);
            modal.componentInstance.messages = this.getErrorMessage();
        }
    }

    getErrorMessage() {
        let result: string[] = [];

        if (this.form.controls['title'].hasError('required')) {
            result.push('Title is required');
        }

        if (this.form.controls['description'].hasError('required')) {
            result.push('Description is required');
        }

        if (this.form.controls['createDate'].hasError('required')) {
            result.push('Create Date is required');
        }

        if (this.form.controls['duration'].hasError('required')) {
            result.push('Duration is required');
        }

        if (this.form.controls['authors'].hasError('required')) {
            result.push('At least one author should be specified');
        }

        return result;
    }

    cancel(event) {
        this.store.dispatch(new state.CancelCourseSelection());
        event.preventDefault();
    }
}

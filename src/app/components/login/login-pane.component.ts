import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
    selector: 'app-login-pane',
    template: ` 
        <template #popContent class="popover">
            <strong>{{user.login}}</strong>
        </template>
        <div fxLayout="row" fxLayoutWrap>
            <div fxFlex="36px">
                <div [ngbPopover]="popContent" placement="bottom" class="user-div">
                    <img class="user-thumb rounded-circle m-x-auto d-block float-right" [src]="'data:image/jpg;base64,'+user.imageBase64" name="user-image" [alt]="user.login"/>
                </div>
            </div>
            <div fxFlex="74px" class="ml-2 mt-1">
                <button type="button" class="btn btn-primary btn-sm" (click)="logout.emit(user)">Logout</button>
            </div>
        </div>
    `,
    styles: [`
        .user-thumb {
            width: 36px;
        }
        .user-div {
            height: 40px;
        }
        .popover-title {
            font-size:0.85rem
        }
    `]
})
export class LoginPaneComponent {
    @Input() user: User;
    @Output() logout = new EventEmitter<User>();

    constructor() {
    }
}

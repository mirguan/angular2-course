export class User {
    id: number;
    login: string;
    password: string;
    token?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

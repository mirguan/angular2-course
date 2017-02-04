export class User {
    id: number;
    login: string;
    password: string;
    token?: string;
    imageBase64: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class Author {
    id: number;
    name = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

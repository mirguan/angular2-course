import { Author } from './author';

export class Course {
    id: number;
    title: string = '';
    description: string = '';
    date: Date;
    duration: number;
    authors: Author[] = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

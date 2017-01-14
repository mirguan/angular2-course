import {Course} from '../models/course';
import {BackendUser} from './backend.user';
import {Author} from '../models/author';

export class BackendService {
    users: BackendUser[];
    courses: Course[];
    authors: Author[];
    courseSeed: number;

    constructor() {
        this.users = [
            new BackendUser(1, 'q', 'q'),
            new BackendUser(2, 'user', 'password')
        ];

        this.authors = [
            new Author({ id: 1, name: 'Smith' }),
            new Author({ id: 2, name: 'Johnson' }),
            new Author({ id: 3, name: 'Williams' }),
            new Author({ id: 4, name: 'Miller' }),
            new Author({ id: 5, name: 'Brown' })
        ];

        this.courses = [
            new Course({
                id: 1, title: 'Course 1', description: 'Description 1', date: new Date(2016, 1, 2), duration: 183,
                authors: [this.authors[0], this.authors[3]]
            })
        ];
        this.courseSeed = this.courses.length + 1;
    }

    getUser(username: string, password: string): BackendUser {
        return this.users.filter(user => user.name === username && user.password === password)[0];
    }

    addCourse(course: Course) {
        course.id = this.courseSeed++;
        this.courses.push(course);
    }
}

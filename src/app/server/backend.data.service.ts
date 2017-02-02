import {Course} from '../models/course';
import {BackendUser} from './backend.user';
import {Author} from '../models/author';

export class BackendDataService {
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
                id: 1, title: 'Course 1', description: 'Description 1', createDate: new Date(2016, 1, 2), duration: 183,
                authors: [this.authors[0], this.authors[3]]
            })
        ];
        this.courseSeed = this.courses.length + 1;
    }

    getUser(login: string, password: string): BackendUser {
        let items: BackendUser[] = this.users.filter(user => user.login === login && user.password === password);
        if (items != null && items.length > 0) {
            return items[0];
        }
        return null;
    }

    getCourses(): Course[] {
        return this.courses.slice(0);
    }

    addCourse(course: Course): Course {
        course.id = this.courseSeed++;
        this.courses.push(course);

        return course;
    }

    getCourse(id: number): Course {
        let items: Course[] = this.courses.filter(course => course.id === id)
        if (items != null && items.length > 0) {
            return items[0];
        }
        return null;
    }

    updateCourse(id: number, source: Course) {
        let course = this.getCourse(id);
        Object.assign(course, source);
    }

    deleteCourse(id: number) {
        this.courses = this.courses.filter(course => course.id !== id);
    }

    getAuthors(): Author[] {
        return this.authors.slice(0);
    }
}

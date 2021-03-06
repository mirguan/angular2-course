import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BackendDataService} from './backend-data.service';
import {User} from '../models/user';
import {Course} from '../models/course';

export function backendMockFactory(backend: MockBackend, options: BaseRequestOptions): Http {
    let service = new BackendDataService();

    backend.connections.subscribe((connection: MockConnection) => {

        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate api end point
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params: User = JSON.parse(connection.request.getBody());

                let user = service.getUser(params.login, params.password);
                // check user credentials and return fake jwt token if valid
                if (user !== null) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({status: 200, body: {token: 'fake-jwt-token', user: <User>user}})
                    ));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                }
                return;
            }

            // courses api end point
            if (connection.request.url.endsWith('/api/courses') && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(
                        new ResponseOptions({status: 200, body: service.getCourses()})
                    ));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                }
                return;
            }

            if (connection.request.url.endsWith('/api/courses') && connection.request.method === RequestMethod.Post) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let course: Course = JSON.parse(connection.request.getBody());

                    course = service.addCourse(course);
                    connection.mockRespond(new Response(
                        new ResponseOptions({status: 201, body: course.id})
                    ));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                }
                return;
            }

            let courseMatcher = /\/api\/courses\/([0-9]+)/i;

            if (connection.request.url.match(courseMatcher) && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let id: number = Number(connection.request.url.match(courseMatcher)[1]);
                    let course: Course = service.getCourse(id);
                    if (course != null) {
                        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: course})));
                        return;
                    }
                    connection.mockRespond(new Response(new ResponseOptions({status: 404})));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                }
                return;
            }

            if (connection.request.url.match(courseMatcher) && connection.request.method === RequestMethod.Put) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let id: number = Number(connection.request.url.match(courseMatcher)[1]);
                    let course: Course = JSON.parse(connection.request.getBody());
                    service.updateCourse(id, course);
                    connection.mockRespond(new Response(new ResponseOptions({status: 200})));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                }
                return;
            }

            if (connection.request.url.match(courseMatcher) && connection.request.method === RequestMethod.Delete) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let id: number = Number(connection.request.url.match(courseMatcher)[1]);
                    service.deleteCourse(id);
                    connection.mockRespond(new Response(new ResponseOptions({status: 200})));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                }
                return;
            }

            if (connection.request.url.endsWith('/api/authors') && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({status: 200, body: service.getAuthors()})
                    ));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                }
                return;
            }
        }, 10);

    });

    return new Http(backend, options);
};


import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BackendDataService } from './backend.data.service';
import { User } from '../models/user';
import { Course } from '../models/course';

export let backendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
        // configure fake backend
        let service = new BackendDataService();

        backend.connections.subscribe((connection: MockConnection) => {

            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate api end point
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                    // get parameters from post request
                    let params = JSON.parse(connection.request.getBody());

                    let user = service.getUser(params.username, params.password);
                    // check user credentials and return fake jwt token if valid
                    if (user !== null) {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token', user: <User>user } })
                        ));
                    } else {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }

                // courses api end point
                if (connection.request.url.endsWith('/api/courses') && connection.request.method === RequestMethod.Get) {
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: service.getCourses() })
                        ));
                    } else {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }

                if (connection.request.url.endsWith('/api/courses') && connection.request.method === RequestMethod.Post) {
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        let course: Course = JSON.parse(connection.request.getBody());

                        service.addCourse(course);
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 201, body: course.id })
                        ));
                    } else {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }

                let courseMatcher = /\/api\/courses\/([0-9]+)/i;

                if (connection.request.url.match(courseMatcher) && connection.request.method === RequestMethod.Get) {
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        let id = c.request.url.match(courseMatcher)[1];
                        let course: Course = service.getCourse(id);
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: course })
                        ));
                    } else {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }

                if (connection.request.url.match(courseMatcher) && connection.request.method === RequestMethod.Put) {
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        let id = c.request.url.match(courseMatcher)[1];
                        let course: Course = JSON.parse(connection.request.getBody());
                        service.updateCourse(id, course);
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })
                        ));
                    } else {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }

                if (connection.request.url.match(courseMatcher) && connection.request.method === RequestMethod.Delete) {
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        let id = c.request.url.match(courseMatcher)[1];
                        service.deleteCourse(id);
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })
                        ));
                    } else {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }

                if (connection.request.url.endsWith('/api/authors') && connection.request.method === RequestMethod.Get) {
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: service.getAuthors() })
                        ));
                    } else {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }
            }, 10);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};

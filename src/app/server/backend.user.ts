﻿export class BackendUser {
    constructor(
        public id: number,
        public login: string,
        public password: string,
        public imageBase64: string) { };
}

export class UserModelOut {
    constructor(
        public readonly id: string,
        public readonly firstname: string,
        public readonly username: string,
        public readonly email: string,
    ) { }
}
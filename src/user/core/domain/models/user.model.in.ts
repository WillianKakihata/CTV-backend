export class UserModelIn {
    constructor(
        public readonly firstname: string,
        public readonly username: string,
        public readonly email: string,
        public readonly password: string
    ) {}
}
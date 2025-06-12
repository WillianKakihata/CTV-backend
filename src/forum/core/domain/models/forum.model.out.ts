export class ForumModelOut {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly userId: Object,
        public readonly description: string,
        public readonly image: string
    ) {}
}
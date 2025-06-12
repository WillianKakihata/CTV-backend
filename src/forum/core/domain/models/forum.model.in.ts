export class ForumModelIn {
    constructor(
        public readonly title: string,
        public readonly userId: Object,
        public readonly description: string,
        public readonly image: string
    ) {}
}
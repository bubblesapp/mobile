export class Action<P = undefined> {
    constructor(
        public payload?: P
    ) {}
}
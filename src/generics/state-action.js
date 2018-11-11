export default class StateAction {
    constructor () {
        this._key = this.constructor.name;
    }

    get key () { return this._key }

    run (stateMachine) {
        // overwrite me
    }
}
import NoOp from './state-action/noop';

export default class State {
    // NOTE: don't override me
    constructor () {
        this._key = this.constructor.name;
    }

    get key () { return this._key }

    // NOTE: overwrite me in child states, but make sure you 'return super.init(data);' at the end
    init (data = {}) {
        return new NoOp(data);
    }

    // NOTE: overwrite me in child states, but make sure you 'return super.run(data);' at the end
    run (data = {}) {
        return new NoOp(data);
    }
}
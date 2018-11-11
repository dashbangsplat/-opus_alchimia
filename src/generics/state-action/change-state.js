import StateAction from '../state-action';

export default class ChangeState extends StateAction {
    constructor (state, data) {
        super();

        this._targetState = state;

        this._initialData = data;
    }

    get targetState () { return this._targetState }

    get initialData () { return this._initialData }

    run (stateMachine) {
        stateMachine.setState(this.targetState, this.initialData);
    }
}
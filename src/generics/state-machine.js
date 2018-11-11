import State from './state';
import StateAction from './state-action';

export default class StateMachine {
    constructor (stateClassList = []) {
        if (!Array.isArray(stateClassList)) throw `${stateClassList} is not an array of state classes`;

        this._currentState = null;
        
        this._possibleStates = {};
        stateClassList.forEach(s => {
            this.addState(s);
        });
    }

    addState (stateClass) {
        if (! (stateClass.prototype instanceof State)) throw `${stateClass} does not inherit from State`;

        let stateKey = new stateClass().key;

        this._possibleStates[stateKey] = stateClass;
    }
    setState (state, initialData, addStateIfNotDefined = false) {
        if (!state) throw 'state is not defined';

        let stateKey = (state instanceof State) ? state.key : (state.prototype && state.prototype instanceof State) ? new state().key : state;

        // preadd state if we are passing in a state object and want it added (e.g. if we 'start' with a new state we haven't added yet)
        if (!this._possibleStates[stateKey] && state.prototype instanceof State) this.addState(state);

        if (!this._possibleStates[stateKey] && !addStateIfNotDefined) throw `${stateKey} not found.`;

        this._currentState = new this._possibleStates[stateKey]();

        let action = this._currentState.init(initialData);

        this.runStateAction(action);

        return action;
    }

    get currentState () { return this._currentState }

    start (state, initialData) {
        return this.setState(state, initialData, true);
    }

    update (data) {
        if (this.currentState && this.currentState instanceof State) {
            let action = this.currentState.run(data);

            this.runStateAction(action);

            return action;
        }

        throw 'current state is not defined or is not an instance of State';
    }

    runStateAction (action) {
        if (! (action instanceof StateAction)) throw `${action} do not inherit from StateAction`;

        action.run(this);
    }
}
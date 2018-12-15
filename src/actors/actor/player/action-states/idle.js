import State from '../../../../generics/state';
import ChangeState from '../../../../generics/state-action/change-state';
import ThrowingPotion from './throwing-potion';

export default class Idle extends State {
    init (data) {
        // set input using destructuring
        let { "player" : { "scene": { "input": input } } } = data;

        this._isThrowingPotion = false;
        this._pointer = null;

        input.once('pointerup', pointer => {
            this._isThrowingPotion = true;
        });

        return super.init(data);
    }

    run (data) {
        // set player using destructuring
        let { player } = data;

        if (this._isThrowingPotion) return new ChangeState(ThrowingPotion, { "player": player });

        return super.run(data);
    }
}
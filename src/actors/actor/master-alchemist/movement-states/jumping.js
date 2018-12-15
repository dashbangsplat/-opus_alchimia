import State from '../../../../generics/state';
import ChangeState from '../../../../generics/state-action/change-state';
import Standing from './standing';

export default class Jumping extends State {
    init (data) {
        // set actor using destructuring
        let { actor } = data;

        actor.jump();

        return super.init(data);
    }

    run (data) {
        // set actor using destructuring
        let { actor } = data;

        if (!actor.isJumping) return new ChangeState(Standing, { "actor": actor });
        
        return super.run(data);
    }
}
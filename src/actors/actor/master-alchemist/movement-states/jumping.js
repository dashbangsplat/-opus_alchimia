import State from '../../../../generics/state';
import ChangeState from '../../../../generics/state-action/change-state';

import { startActorJumping, updateJumpingActor } from '../../../actions/movement';

import Standing from './standing';

export default class Jumping extends State {
    init (data) {
        // set actor using destructuring
        let { actor } = data;

        startActorJumping(actor);

        return super.init(data);
    }

    run (data) {
        let { actor, time, delta } = data;
        let { body } = actor;

        if (body.onFloor()) return new ChangeState(Standing, { "actor": actor });

        updateJumpingActor(actor, time, delta);
        
        return super.run(data);
    }
}
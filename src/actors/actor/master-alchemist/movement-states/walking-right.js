import State from '../../../../generics/state';
import ChangeState from '../../../../generics/state-action/change-state';

import { startActorWalkingRight } from '../../../actions/movement';

import Standing from './standing';
import Jumping from './jumping';

export default class WalkingRight extends State {
    init (data) {
        // set actor using destructuring
        let { actor } = data;

        // set animateStandingLeft and animateStandingRight using destructuring
        let { "actor": { "config": { "anims": { "walkRight": { "key": animateWalkingRight } } } } } = data;

        actor.play(animateWalkingRight);

        startActorWalkingRight(actor);

        return super.init(data);
    }

    run (data) {
        // set actor using destructuring
        let { actor } = data;

        // TODO - using AI determine next movement (whether it is to continue to walk left or change state)

        return super.run(data);
    }
}
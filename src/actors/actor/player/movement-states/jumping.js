import State from '../../../../generics/state';
import ChangeState from '../../../../generics/state-action/change-state';

import { startActorJumping } from '../../../actions/movement';

import Standing from './standing';
import WalkingRight from './walking-right';
import WalkingLeft from './walking-left';

export default class Jumping extends State {
    init (data) {
        // set player using destructuring
        let { player } = data;

        startActorJumping(player);

        return super.init(data);
    }

    run (data) {
        let { player, time, delta } = data;
        let { body } = player;

        if (body.onFloor()) {
            let { "scene": { "inputKeys": { "right": right, "altRight": altRight, "left": left, "altLeft": altLeft } } } = player;

            if (right.isDown || altRight.isDown ) return new ChangeState(WalkingRight, { "player": player });

            if (left.isDown || altLeft.isDown ) return new ChangeState(WalkingLeft, { "player": player });

            return new ChangeState(Standing, { "player": player });
        }

        return super.run(data);
    }
}
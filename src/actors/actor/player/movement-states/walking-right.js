import State from '../../../../generics/state';
import ChangeState from '../../../../generics/state-action/change-state';

import { startActorWalkingRight, updateWalkingActor } from '../../../actions/movement';

import Standing from './standing';
import WalkingLeft from './walking-left';
import Jumping from './jumping';

export default class WalkingRight extends State {
    init (data) {
        let { player } = data;

        let { "player": { "config": { "anims": { "walkRight": { "key": animateWalkingRight } } } } } = data;

        player.play(animateWalkingRight);

        startActorWalkingRight(player);

        return super.init(data);
    }

    run (data) {
        let { player, time, delta } = data;

        let { "scene": { "inputKeys": { "right": right, "altRight": altRight, "left": left, "altLeft": altLeft, "jump": jump } }, body } = player;

        if (left.isDown || altLeft.isDown ) {
            right.isDown = altRight.isDown = false;
            return new ChangeState(WalkingLeft, { "player": player });
        } 

        if (jump.isDown && body.onFloor()) return new ChangeState(Jumping, { "player": player });

        if (right.isUp && altRight.isUp ) return new ChangeState(Standing, { "player": player });

        if (player.canMove) updateWalkingActor(player, time, delta);

        return super.run(data);
    }
}
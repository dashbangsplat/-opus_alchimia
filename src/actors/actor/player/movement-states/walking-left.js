import State from '../../../../generics/state';
import ChangeState from '../../../../generics/state-action/change-state';

import { startActorWalkingLeft, updateWalkingActor } from '../../../actions/movement';

import Standing from './standing';
import WalkingRight from './walking-right';
import Jumping from './jumping';

export default class WalkingLeft extends State {
    init (data) {
        let { player } = data;

        let { "player": { "config": { "anims": { "walkLeft": { "key": animateWalkingLeft } } } } } = data;

        player.play(animateWalkingLeft);

        startActorWalkingLeft(player);

        return super.init(data);
    }

    run (data) {
        let { player, time, delta } = data;

        let { "scene": { "inputKeys": { "right": right, "altRight": altRight, "left": left, "altLeft": altLeft, "jump": jump } } } = player;

        if (right.isDown || altRight.isDown ) {
            left.isDown = altLeft.isDown = false;

            return new ChangeState(WalkingRight, { "player": player });
        } 

        if (jump.isDown ) return new ChangeState(Jumping, { "player": player });

        if (left.isUp && altLeft.isUp ) return new ChangeState(Standing, { "player": player });

        updateWalkingActor(player, time, delta);

        return super.run(data);
    }
}
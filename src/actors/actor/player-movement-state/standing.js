import State from '../../../generics/state';
import ChangeState from '../../../generics/state-action/change-state';
import WalkingRight from './walking-right';
import WalkingLeft from './walking-left';
import Jumping from './jumping';

export default class Standing extends State {
    init (data) {
        // set player using destructuring
        let { player } = data;

        // set animateStandingLeft and animateStandingRight using destructuring
        let { "player": { "config": { "anims": { "standLeft": { "key": animateStandingLeft }, "standRight": { "key": animateStandingRight } } } } } = data;

        if (player.isWalkingLeft()) {
            player.play(animateStandingLeft);
        }
        else if (player.isWalkingRight()) {
            player.play(animateStandingRight);
        }

        player.stopWalking();

        return super.init(data);
    }

    run (data) {
        // set player using destructuring
        let { player } = data;

        // set right, altRight, left, altLeft and jump using destructuring
        let { "scene": { "inputKeys": { "right": right, "altRight": altRight, "left": left, "altLeft": altLeft, "jump": jump } } } = player;

        if (right.isDown || altRight.isDown ) return new ChangeState(WalkingRight, { "player": player });

        if (left.isDown || altLeft.isDown ) return new ChangeState(WalkingLeft, { "player": player });

        if (jump.isDown ) return new ChangeState(Jumping, { "player": player });
        
        return super.run(data);
    }
}
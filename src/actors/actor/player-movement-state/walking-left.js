import State from '../../../generics/state';
import ChangeState from '../../../generics/state-action/change-state';
import Standing from './standing';
import Jumping from './jumping';

export default class WalkingLeft extends State {
    init (data) {
        // set player using destructuring
        let { player } = data;

        // set animateStandingLeft and animateStandingRight using destructuring
        let { "player": { "config": { "anims": { "walkLeft": { "key": animateWalkingLeft } } } } } = data;

        player.play(animateWalkingLeft);

        player.walkLeft();

        return super.init(data);
    }

    run (data) {
        // set player using destructuring
        let { player } = data;

        // set right, altRight, left, altLeft and jump using destructuring
        let { "scene": { "inputKeys": { "left": left, "altLeft": altLeft, "jump": jump } } } = player;

        if (left.isUp && altLeft.isUp ) return new ChangeState(Standing, { "player": player });

        if (jump.isDown ) return new ChangeState(Jumping, { "player": player });

        return super.run(data);
    }
}
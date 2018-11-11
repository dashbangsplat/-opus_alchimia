import State from '../../../generics/state';
import ChangeState from '../../../generics/state-action/change-state';
import Standing from './standing';

export default class Jumping extends State {
    init (data) {
        // set player using destructuring
        let { player } = data;

        player.jump();

        return super.init(data);
    }

    run (data) {
        // set player using destructuring
        let { player } = data;

        if (!player.isJumping) return new ChangeState(Standing, { "player": player });
        
        return super.run(data);
    }
}
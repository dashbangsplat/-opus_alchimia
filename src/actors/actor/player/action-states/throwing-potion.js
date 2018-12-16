import State from '../../../../generics/state';
import ChangeState from '../../../../generics/state-action/change-state';

import { actorThrowsPropAtTarget } from '../../../actions/throwing';

import Standing from '../movement-states/standing';

import Idle from './idle';

export default class ThrowingPotion extends State {
    init (data) {
        // set player using destructuring
        let { player } = data;

        let target = { x: player.scene.input.mousePointer.worldX, y: player.scene.input.mousePointer.worldY };

        // get an available potion from the potion pool
        var potion = player.potions.get();

        // no potion available to throw from potion pool
        if (!potion) return new ChangeState(Idle, { "player": player });

        // since we are dynamically generated... add colliders/overlapping for the potion
        player.scene.addColliders(potion);
        player.scene.addOverlapping(potion);

        // face the direction of throwing
        if (!(player.movement.currentState instanceof Standing)) player.setMovementStanding();

        let facing = target.x < player.x ? 'left' : 'right';

        player.movement.currentState.setStandingAnimation(player, facing); 

        // throw it!
        actorThrowsPropAtTarget(player, potion, target);

        return super.init(data);
    }

    run (data) {
        // set player using destructuring
        let { player } = data;

        let isThrowingSomething = player.potions.countActive(true) > 0;

        if (!isThrowingSomething) return new ChangeState(Idle, { "player": player });

        return super.run(data);
    }
}
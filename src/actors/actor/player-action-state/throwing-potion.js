import State from '../../../generics/state';
import ChangeState from '../../../generics/state-action/change-state';
import Idle from './idle';

export default class ThrowingPotion extends State {
    init (data) {
        // set player using destructuring
        let { player } = data;

        let target = { x: player.scene.input.mousePointer.worldX, y: player.scene.input.mousePointer.worldY };

        var potion = player.potions.get();

        if (!potion) return new ChangeState(Idle, { "player": player });

        player.scene.addColliders(potion);

        player.throw(potion, player, target);

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
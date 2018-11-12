import actorConfig from '../../config/actor';

import Actor from '../actor';

import Standing from './player-movement-state/standing';

export default class Player extends Actor {
    constructor (scene, x = 0, y = 0) {
        super(scene, x, y, actorConfig.player.startingKey, actorConfig.player.startingFrame);

        this.config = actorConfig.player;

        // setup attributes
        console.log(this.attributes);
        this.attributes.bounce.value = this.config.attributes.bounce;
        this.attributes.walkVelocity.value = this.config.attributes.walkVelocity;
        this.attributes.gravity.value = this.config.attributes.gravity;
        this.attributes.jumpVelocity.value = this.config.attributes.jumpVelocity;
        this.attributes.jumpDuration.value = this.config.attributes.jumpDuration;

        // setup player animations
        Object.keys(this.config.anims).forEach(animKey => {
            this.scene.anims.create(this.config.anims[animKey]);
        });

        // start our player standing, other states will be added as needed
        this.movement.start(Standing, { player: this });
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {
        this.movement.update({ player: this });

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
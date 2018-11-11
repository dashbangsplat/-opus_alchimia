import actorConfig from '../../config/actor';

import Actor from '../actor';
import Walker from '../mixins/walker';
import Jumper from '../mixins/jumper';

import Standing from './player-movement-state/standing';

export default class Player extends 
    Walker ( Jumper ( 
        Actor 
    ) ) {
    constructor (scene, x = 0, y = 0) {
        super(scene, x, y, actorConfig.player.startingKey, actorConfig.player.startingFrame);

        this.config = actorConfig.player;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setBounceY(this.config.attributes.bounce);

        this.setCollideWorldBounds(true);

        this.setWalkSpeed(this.config.attributes.walkSpeed);

        this.setGravity(this.config.attributes.gravity);

        this.setJumpSpeed(this.config.attributes.jumpSpeed);

        this.setJumpDuration(this.config.attributes.jumpDuration);

        // setup player animations
        Object.keys(this.config.anims).forEach(animKey => {
            this.scene.anims.create(this.config.anims[animKey]);
        });

        // setup movement state machine for players
        this.movement.start(Standing, { player: this });
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {
        this.movement.update({ player: this });

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
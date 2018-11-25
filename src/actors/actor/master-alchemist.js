import actorConfig from '../../config/actor';

import Actor from '../actor';

import Standing from './master-alchemist-movement-state/standing';

export default class MasterAlchemist extends Actor {
    constructor (scene, x = 0, y = 0) {
        super(scene, x, y, actorConfig.masterAlchemist.startingKey, actorConfig.masterAlchemist.startingFrame);

        this.config = actorConfig.masterAlchemist;

        // setup attributes
        this.attributes.bounce.value = this.config.attributes.bounce;
        this.attributes.gravity.value = this.config.attributes.gravity;
        this.attributes.jumpDuration.value = this.config.attributes.jumpDuration;
        this.attributes.jumpVelocity.value = this.config.attributes.jumpVelocity;
        this.attributes.strength.value = this.config.attributes.strength;
        this.attributes.walkVelocity.value = this.config.attributes.walkVelocity;

        // setup actor animations
        Object.keys(this.config.anims).forEach(animKey => {
            this.scene.anims.create(this.config.anims[animKey]);
        });

        // start our actor standing, other states will be added as needed
        this.movement.start(Standing, { "actor": this });

        this.enableMovement();
    }

    enableMovement () { this.canMove = true; }

    disableMovement () { this.canMove = false; }

    setMovementStanding () {
        this.movement.setState(Standing, { "actor": this });
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {
        if (this.canMove) this.movement.update({ "actor": this });

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
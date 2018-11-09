import actorConfig from '../config/actor';

import Walker from './mixins/walker';
import Jumper from './mixins/jumper';

export default class Player extends 
    Walker ( Jumper (
        Phaser.Physics.Arcade.Sprite
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
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {
        if (this.scene.inputKeys.right.isDown || this.scene.inputKeys.altRight.isDown) {
            if (!this.isWalkingRight()) {
                this.play(this.config.anims.walkRight.key);
            }
            this.walkRight();
        }
        else if (this.scene.inputKeys.left.isDown || this.scene.inputKeys.altLeft.isDown)  {
            if (!this.isWalkingLeft()) {
                this.play(this.config.anims.walkLeft.key);
            }
            this.walkLeft();
        }
        else {
            if (this.isWalkingLeft()) {
                this.play(this.config.anims.standLeft.key);
            }
            else if (this.isWalkingRight()) {
                this.play(this.config.anims.standRight.key);
            }
            this.stopWalking();
        }

        if (this.scene.inputKeys.jump.isDown) {
            this.jump();
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
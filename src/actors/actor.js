import StateMachine from '../generics/state-machine';

import Walker from './mixin/walker';
import Jumper from './mixin/jumper';

import Attributes from '../generics/attributes';
import Bounce from './actor-attribute/bounce';
import Gravity from './actor-attribute/gravity';
import JumpDuration from './actor-attribute/jump-duration';
import JumpVelocity from './actor-attribute/jump-velocity';
import WalkVelocity from './actor-attribute/walk-velocity';

export default class Actor extends
    Walker ( Jumper ( 
        Phaser.Physics.Arcade.Sprite 
    ) ) {
    constructor (scene, x = 0, y = 0, key, frame) {
        super(scene, x, y, key, frame);

        this._movementState = new StateMachine();

        // setup physics body for this actor
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // actors collide with world bounds
        this.setCollideWorldBounds(true);

        // attributes
        this._attributes = new Attributes();
        this._attributes.addAttribute(new Bounce(this));
        this._attributes.addAttribute(new Gravity(this));
        this._attributes.addAttribute(new JumpDuration(this));
        this._attributes.addAttribute(new JumpVelocity(this));
        this._attributes.addAttribute(new WalkVelocity(this));
    }

    get movement () { return this._movementState }

    get attributes () { return this._attributes }
}
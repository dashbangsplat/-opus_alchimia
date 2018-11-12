import Throwable from './mixin/throwable';

import Attributes from '../generics/attributes';
import gravity from './prop-attribute/gravity';

export default class Prop extends
    Throwable ( 
        Phaser.Physics.Arcade.Sprite 
    ) {
    constructor (scene, x = 0, y = 0, key, frame) {
        super(scene, x, y, key, frame);

        // setup physics body for this actor
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // actors collide with world bounds
        this.setCollideWorldBounds(true);

        // attributes
        this._attributes = new Attributes();
        this._attributes.addAttribute(new gravity(this));
    }

    get attributes () { return this._attributes }
}
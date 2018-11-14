import Collider from './mixin/collider';

import Attributes from '../generics/attributes';
import Active from './prop-attribute/active';

export default class PropStatic extends
    Collider ( 
        Phaser.Physics.Arcade.Sprite 
    ) {
    constructor (scene, x = 0, y = 0, key, frame) {
        super(scene, x, y, key, frame);

        // setup physics body for this actor
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);

        // setup colliders with everything else applicable in the scene
        if (this.scene.addColliders) {
            this.scene.addColliders(this);
        }

        // attributes
        this._attributes = new Attributes();
        this._attributes.addAttribute(new Active(this));
    }

    get attributes () { return this._attributes }
}
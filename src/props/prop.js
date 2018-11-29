import Throwable from './mixin/throwable';
import Collider from './mixin/collider';

import Attributes from '../generics/attributes';
import Gravity from './prop-attribute/gravity';
import Active from './prop-attribute/active';

import PropInventoryItem from './prop-inventory-item';

export default class Prop extends
    Collider ( Throwable ( 
        Phaser.Physics.Arcade.Sprite 
    ) ) {
    constructor (scene, x = 0, y = 0, key, frame) {
        super(scene, x, y, key, frame);

        // setup physics body for this actor
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);

        // attributes
        this._attributes = new Attributes();
        this._attributes.addAttribute(new Gravity(this));
        this._attributes.addAttribute(new Active(this));

        // since we are dynamically generated... add colliders/overlapping for the potion
        if (this.scene.addColliders) this.scene.addColliders(this);
        if (this.scene.addOverlapping) this.scene.addOverlapping(this);

        // add ourselves to props list
        if (this.scene.props) this.scene.props.add(this);

        // actors collide with world bounds
        this.setCollideWorldBounds(true);
    }

    get label () { return 'Prop'; }

    get attributes () { return this._attributes }

    get inventoryItem () { return new PropInventoryItem(this); }

    remove () {
        // remove ourselves from props list
        if (this.scene.props) this.scene.props.remove(this);

        // destroy out stuff
        this.destroyCollisionHandlers();
        this.destroyOverlapHandlers();

        // destroy ourself (from Phaser.Physics.Arcade.Sprite)
        this.destroy();
    }
}
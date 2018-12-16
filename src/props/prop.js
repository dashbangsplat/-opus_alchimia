import Attributes from '../generics/attributes';
import { setupCollisionDetectionOnThing, setCollidesWithTypeForThing, setOverlapsWithTypeForThing,
         destroyCollisionHandlersForThing, destroyOverlapHandlersForThing } from '../generics/actions/collision';

import Gravity from './attributes/gravity';
import Active from './attributes/active';

import InventoryItem from '../generics/inventory-item';

export default class Prop extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x = 0, y = 0, key, frame) {
        super(scene, x, y, key, frame);

        // setup physics body for this actor
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        
        // add ourselves to props list
        if (this.scene.props) this.scene.props.add(this);

        // actors collide with world bounds
        this.setCollideWorldBounds(true);

        // attributes
        this._attributes = new Attributes();
        this._attributes.addAttribute(new Gravity(this));
        this._attributes.addAttribute(new Active(this));

        // Collision Detection
        setupCollisionDetectionOnThing(this);
        setCollidesWithTypeForThing(this, 'map', true);
        setOverlapsWithTypeForThing(this, 'actors', true);
        setOverlapsWithTypeForThing(this, 'props', true);

        // since we may dynamically generated... add colliders/overlapping for prop
        if (this.scene.addColliders) this.scene.addColliders(this);
        if (this.scene.addOverlapping) this.scene.addOverlapping(this);
    }

    get label () { return 'Prop'; }

    get attributes () { return this._attributes }

    get inventoryItem () { return new InventoryItem(this); }

    preUpdate (time, delta) {
        // if we are throwing and we have a lifespan
        if (this.hasLifespan) {
            this.lifespan -= delta;

            if (this.lifespan <= 0) {
                this.hasLifespan = undefined;
                this.lifespan = undefined;
                this.disableBody(true, true);
            }
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }

    remove () {
        // remove ourself from props list
        if (this.scene.props) this.scene.props.remove(this);

        // destroy out stuff
        destroyCollisionHandlersForThing(this);
        destroyOverlapHandlersForThing(this);

        // destroy ourself (from Phaser.Physics.Arcade.Sprite)
        this.destroy();
    }
}
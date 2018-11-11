import propConfig from '../config/prop';

import Throwable from './mixins/throwable';

export default class Potion extends 
    Throwable (
        Phaser.Physics.Arcade.Image
    ) {
    constructor (scene, x = 0, y = 0) {
        super(scene, x, y, propConfig.xlCirclePotion.key, propConfig.xlCirclePotion.frame);

        this.config = propConfig.xlCirclePotion;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // TODO add attributes
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {
        // TOOD add movement updates

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
import propConfig from '../../config/prop';

import PropDynamic from '../prop-dynamic';

export default class Potion extends PropDynamic {
    constructor (scene, x = 0, y = 0) {
        super(scene, x, y, propConfig.xlCirclePotion.key, propConfig.xlCirclePotion.frame);

        this.config = propConfig.xlCirclePotion;

        // setup attributes
        this.attributes.gravity.value = this.config.attributes.gravity;
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {
        // TOOD add movement updates

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
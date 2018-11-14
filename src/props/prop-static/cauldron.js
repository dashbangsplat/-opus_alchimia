import propConfig from '../../config/prop';

import PropStatic from '../prop-static';

export default class Cauldron extends PropStatic {
    constructor (scene, x = 0, y = 0) {
        super(scene, x, y, propConfig.cauldron.key, propConfig.cauldron.frame);

        this.config = propConfig.cauldron;
    }
}
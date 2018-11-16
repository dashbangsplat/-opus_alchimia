import propConfig from '../../config/prop';

import Prop from '../prop';

export default class Cauldron extends Prop {
    constructor (scene, x = 0, y = 0) {
        super(scene, x, y, propConfig.cauldron.key, propConfig.cauldron.frame);

        this.config = propConfig.cauldron;

        this.setImmovable(true);
    }
}
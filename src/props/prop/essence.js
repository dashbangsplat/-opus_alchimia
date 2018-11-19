import propConfig from '../../config/prop.json';

import Prop from '../prop';
import Collectable from '../mixin/collectable';

export default class Essence extends Collectable ( Prop ) {
    constructor (scene, x, y, type = 'magic') {
        let configKey = `${type}Essence`;

        super(scene, x, y, propConfig[configKey].key, propConfig[configKey].frame);

        this.config = propConfig[configKey];

        // setup attributes
        this.attributes.gravity.value = this.config.attributes.gravity;
    }
}
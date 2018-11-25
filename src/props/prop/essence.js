import propConfig from '../../config/prop.json';

import Prop from '../prop';

export default class Essence extends Prop {
    constructor (scene, x, y, type = 'magic') {
        let configKey = `${type}Essence`;

        super(scene, x, y, propConfig[configKey].key, propConfig[configKey].frame);

        this.config = propConfig[configKey];

        // setup attributes
        this.attributes.gravity.value = this.config.attributes.gravity;

        this._tintShiftSeconds = 200;
        this._tintShiftTime = 0;
        this.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff);
    }
}
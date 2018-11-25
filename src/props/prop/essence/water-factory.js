import WaterEssence from './water';

import EssenceFactory from '../essence-factory';

export default class WaterEssenceFactory extends EssenceFactory {
    constructor(scene) {
        super(scene, WaterEssence);
    }
}
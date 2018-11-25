import LightEssence from './light';

import EssenceFactory from '../essence-factory';

export default class LightEssenceFactory extends EssenceFactory {
    constructor(scene) {
        super(scene, LightEssence);
    }
}
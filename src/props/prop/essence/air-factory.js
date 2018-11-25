import AirEssence from './air';

import EssenceFactory from '../essence-factory';

export default class AirEssenceFactory extends EssenceFactory {
    constructor(scene) {
        super(scene, AirEssence);
    }
}
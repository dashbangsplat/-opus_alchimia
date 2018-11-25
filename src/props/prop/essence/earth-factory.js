import EarthEssence from './earth';

import EssenceFactory from '../essence-factory';

export default class EarthEssenceFactory extends EssenceFactory {
    constructor(scene) {
        super(scene, EarthEssence);
    }
}
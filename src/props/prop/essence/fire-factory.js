import FireEssence from './Fire';

import EssenceFactory from '../essence-factory';

export default class FireEssenceFactory extends EssenceFactory {
    constructor(scene) {
        super(scene, FireEssence);
    }
}
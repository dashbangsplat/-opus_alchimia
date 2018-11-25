import MagicEssence from './magic';

import EssenceFactory from '../essence-factory';

export default class MagicEssenceFactory extends EssenceFactory {
    constructor(scene) {
        super(scene, MagicEssence);
    }
}
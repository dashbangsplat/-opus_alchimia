import DarkEssence from './dark';

import EssenceFactory from '../essence-factory';

export default class DarkEssenceFactory extends EssenceFactory {
    constructor(scene) {
        super(scene, DarkEssence);
    }
}
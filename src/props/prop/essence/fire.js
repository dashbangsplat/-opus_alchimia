import Essence from '../essence';

export default class FireEssence extends Essence {
    constructor (scene, x, y) {
        super(scene, x, y, 'fire');

        this.setTint(0xaa0000, 0xaa6600, 0xaa6600, 0xaa0000);
    }
}
import Essence from '../essence';

export default class EarthEssence extends Essence {
    constructor (scene, x, y) {
        super(scene, x, y, 'earth');

        this.setTint(0x00ff00, 0x666600, 0x666600, 0x00ff00);
    }
}
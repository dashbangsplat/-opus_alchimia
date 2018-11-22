import Essence from '../essence';

export default class WaterEssence extends Essence {
    constructor (scene, x, y) {
        super(scene, x, y, 'water');

        this.setTint(0x3333cc, 0x0000ff, 0x0000ff, 0x3333cc);
    }
}
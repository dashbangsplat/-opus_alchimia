import Essence from '../essence';

export default class MagicEssence extends Essence {
    constructor (scene, x, y) {
        super(scene, x, y, 'magic');

        this.setTint(0xdd66ff, 0x0000ff, 0xdd66ff, 0x0000ff);
    }
}
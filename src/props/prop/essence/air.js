import Essence from '../essence';

export default class AirEssence extends Essence {
    constructor (scene, x, y) {
        super(scene, x, y, 'air');

        this.setTint(0xffff33, 0x333399, 0x333399, 0xffff33);
    }

    get label () { return 'Air Essence'; }
}
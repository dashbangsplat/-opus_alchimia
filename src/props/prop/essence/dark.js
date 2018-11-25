import Essence from '../essence';

export default class DarkEssence extends Essence {
    constructor (scene, x, y) {
        super(scene, x, y, 'dark');

        this.setTint(0x999999, 0x333333, 0x333333, 0x999999);
    }

    get label () { return 'Dark Essence'; }
}
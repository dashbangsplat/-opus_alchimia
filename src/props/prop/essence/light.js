import Essence from '../essence';

export default class LightEssence extends Essence {
    constructor (scene, x, y) {
        super(scene, x, y, 'light');

        this.setTint(0xffffaa, 0xffffff, 0xffffff, 0xffffaa);
    }

    get label () { return 'Light Essence'; }
}
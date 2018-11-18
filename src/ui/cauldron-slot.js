import uiConfig from '../config/ui';

export default class CauldronSlot extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super (scene, x, y, uiConfig.cauldronSlot.key, uiConfig.cauldronSlot.frame);

        this.config = uiConfig.cauldronSlot;
    }
}
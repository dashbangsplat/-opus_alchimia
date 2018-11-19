import uiConfig from '../config/ui';

import CauldronSlot from '../ui/cauldron-slot';

export default class CauldronUIScene extends Phaser.Scene {
    constructor (config, key = 'CauldronUI') {
        super({ key: key });
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    init () {
        this.scene.bringToTop();

        this.inputKeys = {};
        this.inputKeys.exit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    create () {
        let { width, height } = this.sys.game.config;

        this.add.rectangle(width / 2, height / 2, width, height, 0x000000);

        let cauldron = this.add.image(uiConfig.cauldron.width / 2, height - uiConfig.cauldron.height / 2 + 2, uiConfig.cauldron.key, uiConfig.cauldron.frame);

        let cauldronSlots = [];
        for (let i = 0; i < uiConfig.cauldron.maxSlots; i++) {
            let cauldronSlot = new CauldronSlot(
                this, 
                cauldron.x - (cauldron.width * cauldron.originX) + uiConfig.cauldron.slotStartX + uiConfig.cauldronSlot.width / 2 + i * (uiConfig.cauldronSlot.width + uiConfig.cauldron.slotSpacing), 
                cauldron.y - (cauldron.height * cauldron.originY) + uiConfig.cauldron.slotStartY + uiConfig.cauldronSlot.height / 2
            );
            this.add.existing(cauldronSlot);
            cauldronSlots.push(cauldronSlot);
        }
        console.log(cauldronSlots);
    }

    update () {
        if (this.inputKeys.exit.isDown) {
            this.inputKeys.exit.isDown = false; // reset the key so it isn't remembered
            this.scene.resume('WorldMap');
            this.scene.sleep();
            return;
        }
    }
};

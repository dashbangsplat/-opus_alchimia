import gameConfig from '../config/game';

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

        this.add.image(width / 2, height / 2, gameConfig.cauldronUI.key, gameConfig.cauldronUI.frame);
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

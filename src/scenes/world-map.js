import gameConfig from '../config/game';

import Player from '../actors/player';

export default class WorldMapScene extends Phaser.Scene {
    constructor (config, key = 'WorldMap') {
        super({ key: key });
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    init () {
        this.inputKeys = this.input.keyboard.createCursorKeys();

        this.inputKeys.altLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.inputKeys.altUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.inputKeys.altRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.inputKeys.altDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.inputKeys.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create () {
        this.setupMap();

        this.setupPlayer();
    }

    update () {
    }

    setupMap () {
        this.tilemap = this.make.tilemap({ key: gameConfig.worldMap.key });

        this.tilesets = {};
        gameConfig.worldMap.tilesets.forEach(tileset => {
            this.tilesets[tileset.key] = this.tilemap.addTilesetImage(tileset.key);
        });

        this.tileLayers = {};
        gameConfig.worldMap.tileLayers.forEach(layer => {
            this.tileLayers[layer.name] = this.tilemap.createDynamicLayer(layer.name, this.tilesets[layer.tileset], 0, 0);

            // set z-index of layers per their depth setting, 0 is at the same depth as sprites
            this.tileLayers[layer.name].setDepth(layer.depth);
        });

        // set collision on middle layer 
        this.tileLayers.middle.setCollisionByProperty({ collides: true });

        this.tileLayers.foreground.setDepth(1);

        // resize world to match the tilemap
        this.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    }

    setupPlayer () {
        this.player = new Player(this);
        this.player.setX(this.player.width / 2);
        this.player.setY(this.tilemap.heightInPixels - 250);

        this.cameras.main.startFollow(this.player, true);

        this.physics.add.collider(this.player, this.physics.world); // player to collide with world
        this.physics.add.collider(this.player, this.tileLayers.middle); // player to collide with map
    }
};

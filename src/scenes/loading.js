// json imports
import gameConfig from '../config/game.json';

// web fonts
// import WebFont from 'webfontloader';
// require('../../assets/css/fonts.css');
// require('../../assets/fonts/[font].ttf');

// require in other assets to be included but not added to cache at this time
require('../../assets/icons/favicon.ico');
require('../../assets/json/tutorial.json');
require('../../assets/images/game_tileset.png');
require('../../assets/json/spriteatlas.json');
require('../../assets/images/spriteatlas.png');
require('../../assets/images/play.png');

export default class LoadingScene extends Phaser.Scene {
    constructor (config, key = 'Loading') {
        super({ key: key });
    }

    init () {
        // font loading
        this.areFontsLoaded = true;
    }

    preload () {
        // load tileset to be used in tilemaps
        this.load.image('game_tileset', 'game_tileset.png');

        // load tilemap json for each tilemap
        ['tutorial'].forEach(mapKey => {
            this.load.tilemapTiledJSON(gameConfig[mapKey].key, gameConfig[mapKey].file);
        });

        // load sprite atlas
        this.load.atlas(gameConfig.spriteAtlas.key, gameConfig.spriteAtlas.file, gameConfig.spriteAtlas.json);

        // load web fonts
        /* WebFont.load({
            active: function () {
                this.webfontsLoaded();
            }.bind(this),
            custom: {
                families: ['font name'],
                urls: ['fonts.css']
            }
        }); */
    }

    webfontsloaded () {
        this.areFontsLoaded = true;
    }

    update () {
        if (this.areFontsLoaded) {
            this.input.stopPropagation();
            this.scene.start('MainMenu');
        }
    }
};

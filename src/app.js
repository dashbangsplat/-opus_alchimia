import 'phaser';
import 'lodash';
import 'webfontloader';

import gameConfig from './config/game';

require('./index.html'); // so we get it in the dist

// import scenes
import LoadingScene from './scenes/loading';
import MainMenuScene from './scenes/main-menu';
import WorldMapScene from './scenes/world-map';

var phaserGameConfig = {
    type: Phaser.AUTO,
    width: gameConfig.screen.width,
    height: gameConfig.screen.height,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true, // enable to see physics bodies outlined
        }
    },
    scene: [LoadingScene, MainMenuScene, WorldMapScene]
}

let game = new Phaser.Game(phaserGameConfig);

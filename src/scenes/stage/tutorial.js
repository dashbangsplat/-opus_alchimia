import gameConfig from '../../config/game';

import Stage from '../stage';

export default class TutorialScene extends Stage {
    constructor () {
        super('Tutorial');
    }

    mapConfig () { return gameConfig.tutorial }

    create () {
        super.create();

        // start player frozen
        this.player.disableUseCauldron();
        this.player.disableActions();
        this.player.disableMovement();
    }
};

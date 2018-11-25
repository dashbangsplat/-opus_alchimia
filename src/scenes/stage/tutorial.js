import gameConfig from '../../config/game';

import Cauldron from '../../props/prop/cauldron';

import Stage from '../stage';

export default class TutorialScene extends Stage {
    constructor () {
        super('Tutorial');
    }

    mapConfig () { return gameConfig.tutorial }

    create () {
        super.create();

        this.setUI('TutorialUI');

        // start player frozen
        this.player.disableUseCauldron();
        this.player.disableActions();
        this.player.disableMovement();

        // start with cauldron hidden
        this.props.getChildren().filter(prop => { return prop instanceof Cauldron; }).forEach(cauldron => { cauldron.disableBody(true, true); });

        this.ui.events.once('ui-created', () => {
            this.ui.setText("Welcome initiate.\n Thank you for choosing to accept the alchemy trials.\n Please come forth.\n Use WASD to move, spacebar to jump.", () => {
                this.player.enableMovement();
            });
        });
    }
};

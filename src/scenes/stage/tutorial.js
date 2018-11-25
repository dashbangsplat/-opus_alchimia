import gameConfig from '../../config/game';

import Player from '../../actors/actor/player';

import Cauldron from '../../props/prop/cauldron';

import TutorialUseCauldron from '../../triggers/trigger/tutorial-use-cauldron';

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
        this.hideCauldron();

        this.ui.events.once('ui-created', () => {
            this.ui.setText("Welcome my apprentice, please come forth.\n\n(Use WASD to move and spacebar to jump)", () => {
                this.setupTriggerOnTutorialUseCauldron(); 
                this.player.enableMovement();
            });
        });
    }

    setupTriggerOnTutorialUseCauldron () {
        this.playerTriggeredTutorialUsedCauldron = false;

        this.triggers.getChildren().filter(trigger => { return trigger instanceof TutorialUseCauldron; }).forEach(trigger => {
            trigger.events.on('touched', thing => {
                if (thing instanceof Player && !this.playerTriggeredTutorialUsedCauldron) {
                    this.player.disableMovement();
                    this.player.setMovementStanding();

                    this.ui.setText("Take this essence and create your first potion.\n\n(Press E when you are touching a cauldron to use it)", () => {
                        this.player.enableMovement();
                        this.player.enableUseCauldron();
                        this.showCauldron();
                        this.disableTriggerOnTutorialUseCauldron();
                    });

                    this.playerTriggeredTutorialUsedCauldron = true;
                }
            });
        });
    }

    disableTriggerOnTutorialUseCauldron () {
        this.triggers.getChildren().filter(trigger => { return trigger instanceof TutorialUseCauldron; }).forEach(trigger => { trigger.disable(); });
    }

    hideCauldron () {
        this.props.getChildren().filter(prop => { return prop instanceof Cauldron; }).forEach(cauldron => { cauldron.disableBody(true, true); });
    }

    showCauldron () {
        this.props.getChildren().filter(prop => { return prop instanceof Cauldron; }).forEach(cauldron => { cauldron.enableBody(false, 0, 0, true, true); });
    }
};

import actorConfig from '../../config/actor';

import Actor from '../actor';

import { registerOverlapHanderForThing } from '../../generics/actions/collision';

import Standing from './player/movement-states/standing';

import Idle from './player/action-states/idle';

import Potion from '../../props/prop/potion';
import Cauldron from '../../props/prop/cauldron';

export default class Player extends Actor {
    constructor (scene, x = 0, y = 0) {
        super(scene, x, y, actorConfig.player.startingKey, actorConfig.player.startingFrame);

        this.config = actorConfig.player;

        // setup base attributes
        this.attributes.bounce.value = this.config.attributes.bounce;
        this.attributes.gravity.value = this.config.attributes.gravity;
        this.attributes.jumpDuration.value = this.config.attributes.jumpDuration;
        this.attributes.jumpVelocity.value = this.config.attributes.jumpVelocity;
        this.attributes.strength.value = this.config.attributes.strength;
        this.attributes.walkVelocity.value = this.config.attributes.walkVelocity;

        // setup player animations
        Object.keys(this.config.anims).forEach(animKey => {
            this.scene.anims.create(this.config.anims[animKey]);
        });

        // setup our potion pool
        this.potions = this.scene.add.group({
            classType: Potion,
            maxSize: 1,
            runChildUpdate: true
        });

        // start our player standing, other states will be added as needed
        this.movement.start(Standing, { "player": this });

        // start our player action as idle, other states will be added as needed
        this.action.start(Idle, { "player": this });

        // overlap handler for using the cauldron
        registerOverlapHanderForThing(this, 'useCauldron', (self, other) => {
            if (this.canUseCauldron && other instanceof Cauldron && this.scene.inputKeys.use.isDown) {
                this.scene.inputKeys.use.isDown = false; // reset the key so it isn't remembered
                this.movement.setState(Standing, { "player": this }); // set our movement state to standing so we come back from the cauldron UI just standing
                this.scene.startCauldronUI();
            }
        });

        // overlap handler for picking up essence
        registerOverlapHanderForThing(this, 'pickupEssence', (self, other) => {
            if (!other.constructor.name.match(/Essence/)) return;

            // add as an inventory item
            this.inventory.add(other.inventoryItem);

            // remove the prop
            other.remove();
            other = undefined;
        });

        this.enableMovement();
        this.enableActions();
        this.enableUseCauldron();
    }

    get isPlayer () { return true; }

    enableMovement () { this.canMove = true; }

    disableMovement () { 
        this.canMove = false;

        this.setMovementStanding(); 
    }

    enableActions () { this.canAct = true; }

    disableActions () { this.canAct = false; }

    enableUseCauldron () { this.canUseCauldron = true; }

    disableUseCauldron () { this.canUseCauldron = false; }

    setMovementStanding () {
        this.movement.setState(Standing, { "player": this });
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {
        if (this.canMove) this.movement.update({ "player": this, time, delta });

        if (this.canAct) this.action.update({ "player": this, time, delta });

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
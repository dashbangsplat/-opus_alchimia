import uiConfig from '../config/ui';

import CauldronSlot from '../ui/cauldron-slot';

import Potion from '../props/prop/potion';
import { extractInteractiveIconFromPropFactoryForScene } from '../props/actions/icons';

function getFilledCauldronSlots(slots) {
    return slots.filter(slot => { return slot.slottedItem !== undefined; });
}

export default class CauldronUIScene extends Phaser.Scene {
    constructor (config, key = 'CauldronUI') {
        super({ key: key });
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    init (data) {
        // pause the current stage scene
        this.stageScene = data.scene;
        this.stageScene.pause();

        // bring myself to the front
        this.scene.bringToTop();

        // setup input
        this.inputKeys = {};
        this.inputKeys.exit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    create () {
        let { width, height } = this.sys.game.config;

        this.add.rectangle(width / 2, height / 2, width, height, 0x000000);

        // the cauldron ui
        let cauldron = this.add.image(uiConfig.cauldron.width / 2, height - uiConfig.cauldron.height / 2 + 2, uiConfig.cauldron.key, uiConfig.cauldron.frame);

        // cauldron slots where essence is placed
        this.cauldronSlots = [];
        for (let i = 0; i < uiConfig.cauldron.maxSlots; i++) {
            let cauldronSlot = new CauldronSlot(
                this, 
                cauldron.x - (cauldron.width * cauldron.originX) + uiConfig.cauldron.slotStartX + uiConfig.cauldronSlot.width / 2 + i * (uiConfig.cauldronSlot.width + uiConfig.cauldron.slotSpacing), 
                cauldron.y - (cauldron.height * cauldron.originY) + uiConfig.cauldron.slotStartY + uiConfig.cauldronSlot.height / 2
            );
            this.add.existing(cauldronSlot);
            this.cauldronSlots.push(cauldronSlot);
        }

        // cauldron result potion
        this.potionIcon = extractInteractiveIconFromPropFactoryForScene({
            scene: this, 
            propFactory: () => { return new Potion(this); }, 
            x: uiConfig.cauldron.width / 2, 
            y: 100
        });
        this.add.existing(this.potionIcon);
        this.potionIcon.visible = false;

        // This implies we are creating a potion
        this.potionIcon.on('pointerup', () => {
            getFilledCauldronSlots(this.cauldronSlots).forEach(slot => {
                slot.slottedItem.itemGroup.decrement();
            });
            console.log('clicked', this.stageScene.player.inventory.list);
            this.events.emit('potionCreated');
            this.resumeStage();
        });

        // display player inventory
        let inventoryStartX = width - 300;
        let inventoryStartY = 50;
        let inventoryPadding = 10;
        console.log(this.stageScene.player.inventory.list);
        this.stageScene.player.inventory.list.forEach(itemGroup => {
            let draggableIcon = itemGroup.item.generateIcon(this, inventoryStartX, inventoryStartY).setInteractive();
            draggableIcon.itemGroup = itemGroup;
            draggableIcon.originalX = draggableIcon.x;
            draggableIcon.originalY = draggableIcon.y;
            this.add.existing(draggableIcon);
            this.input.setDraggable(draggableIcon);

            // descriptive text
            this.add.text(inventoryStartX + draggableIcon.width + inventoryPadding, inventoryStartY, itemGroup.item.label + ' x ' + itemGroup.quantity, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });

            inventoryStartY += 50;
        });

        // put them back at icon if not in a cauldron slot
        this.input.on('dragstart', (pointer, gameObject) => {
            if (gameObject.itemGroup) {
                // if we are our original spot in inventory, then create a dummy placeholder as we get moved around
                if (gameObject.x === gameObject.originalX && gameObject.y === gameObject.originalY) {
                    let dummyIcon = gameObject.itemGroup.item.generateIcon(this, gameObject.x, gameObject.y);
                    gameObject.dummyIcon = dummyIcon;
                    this.add.existing(dummyIcon);
                }
            }
        });

        // drag things around
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // put them back at icon if not in a cauldron slot
        this.input.on('dragend', (pointer, gameObject) => {
            if (gameObject.itemGroup) {
                let { x, y } = gameObject;
                let foundSlot = false;

                // undo previous cauldronSlot if set 
                if (gameObject.cauldronSlot) {
                    gameObject.cauldronSlot.slottedItem = undefined;
                    gameObject.cauldronSlot = undefined;
                }

                // check each cauldron slot and store us in one if we are within bounds
                this.cauldronSlots.forEach(slot => {
                    let bounds = slot.getBounds();

                    if (bounds.x <= x && x <= bounds.x + bounds.width && bounds.y <= y && y <= bounds.y + bounds.height && (!slot.slottedItem || slot.slottedItem == gameObject)) {
                        slot.slottedItem = gameObject;
                        gameObject.cauldronSlot = slot;
                        gameObject.x = slot.x;
                        gameObject.y = slot.y;
                        foundSlot = true;
                    }
                });

                // if we didn't get placed in a cauldron slot then we reset
                if (!foundSlot) {
                    // move us back to our original position
                    gameObject.x = gameObject.originalX;
                    gameObject.y = gameObject.originalY;

                    // destroy any dummy item we had
                    if (gameObject.dummyIcon) {
                        gameObject.dummyIcon.destroy();
                        gameObject.dummyIcon = undefined;
                    }
                }
            }
        });
    }

    resumeStage () {
        // resume the current stage scene
        this.stageScene.resume();

        // put myself to sleep
        this.scene.sleep();
    }

    update () {
        let filledCauldronSlots = getFilledCauldronSlots(this.cauldronSlots);

        if (filledCauldronSlots.length > 0) {
            this.potionIcon.visible = true;
        } else {
            this.potionIcon.visible = false;
        }

        if (this.inputKeys.exit.isDown) {
            this.inputKeys.exit.isDown = false; // reset the key so it isn't remembered

            this.resumeStage();

            return;
        }
    }
};

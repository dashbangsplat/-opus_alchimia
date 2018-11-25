import Player from '../actors/actor/player';

import Cauldron from '../props/prop/cauldron';
import AirEssence from '../props/prop/essence/air';
import DarkEssence from '../props/prop/essence/dark';
import EarthEssence from '../props/prop/essence/earth';
import FireEssence from '../props/prop/essence/fire';
import LightEssence from '../props/prop/essence/light';
import MagicEssence from '../props/prop/essence/magic';
import WaterEssence from '../props/prop/essence/water';

import TutorialUseCauldron from '../triggers/trigger/tutorial-use-cauldron';

/* abstract stage class, don't add directly to app

Synopsis:
import gameConfig from 'path/to/config/game';

import Stage from 'path/to/stage';

export default class MyStageScene extends Stage {
    constructor () {
        super('MyUniqueSceneName');
    }

    mapConfig () {
        return gameConfig.someMapConfigKey;
    }
}

*/
export default class Stage extends Phaser.Scene {
    constructor (key) {
        if (!key || typeof key !== 'string') throw 'Scene key not defined!';

        super({ key: key });
    }
   
    // Methods where overwriting required
    mapConfig () {
        throw 'Not overwritting to require the map configuration json';
    }

    // Phaser.Scene related methods
    init () {
        this.inputKeys = this.input.keyboard.createCursorKeys();

        this.inputKeys.altLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.inputKeys.altUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.inputKeys.altRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.inputKeys.altDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.inputKeys.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.inputKeys.use = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    create () {
        this.actors = this.add.group();
        this.props = this.add.group();
        this.triggers = this.add.group();

        this.setupMap();

        this.setupProps();

        this.setupActors();

        this.setupTriggers();

        this.setupCollisionsAndOverlapping();
    }

    // Stage related methods
    setupMap () {
        let mapConfig = this.mapConfig();

        // create initial timemap game object
        this.tilemap = this.make.tilemap({ key: mapConfig.key });

        // world dimensions
        let { widthInPixels: worldWidth, heightInPixels: worldHeight } = this.tilemap;

        // sky
        let { sky: { color: { red: skyRed, green: skyGreen, blue: skyBlue } } } = mapConfig;
        let skyColor = Phaser.Display.Color.GetColor(skyRed, skyGreen, skyBlue);
        this.sky = this.add.rectangle(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, skyColor);
        this.sky.setDepth(-10);

        // add map tilesets
        this.tilesets = {};
        mapConfig.tilesets.forEach(tileset => {
            this.tilesets[tileset] = this.tilemap.addTilesetImage(tileset);
        });

        // add map layers
        this.tileLayers = {};
        mapConfig.tileLayers.forEach(layer => {
            let { name: layerName, tileset: layerTileset, depth: layerDepth } = layer;

            this.tileLayers[layerName] = this.tilemap.createDynamicLayer(layerName, this.tilesets[layerTileset], 0, 0);

            // set z-index of layers per their depth setting, 0 is at the same depth as sprites
            this.tileLayers[layerName].setDepth(layerDepth);
        });

        // set collision on middle layer 
        this.tileLayers.middle.setCollisionByProperty({ collides: true });

        // resize world to match the tilemap
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    }

    setupActors () {
        this.tilemap.objects.forEach(objectLayer => {
            if (objectLayer.name !== 'actors') return;

            objectLayer.objects.forEach(actor => {
                let actorProperties = _.reduce(actor.properties, (properties, property) => { properties[property.name] = property.value; return properties; }, {});

                let ActorClass = this.getActorClass(actorProperties.class); 

                let actorInstance = new ActorClass(this);
                actorInstance.setPosition(actor.x, actor.y);

                if (actorInstance instanceof Player) {
                    this.cameras.main.startFollow(actorInstance, true);
                    this.player = actorInstance;
                }

                this.actors.add(actorInstance);
            });
        });
    }

    setupProps () {
        this.tilemap.objects.forEach(objectLayer => {
            if (objectLayer.name !== 'props') return;

            objectLayer.objects.forEach(prop => {
                let propProperties = _.reduce(prop.properties, (properties, property) => { properties[property.name] = property.value; return properties; }, {});

                let PropClass = this.getPropClass(propProperties.class); 

                let propInstance = new PropClass(this);
                propInstance.setPosition(prop.x, prop.y);

                this.props.add(propInstance);
            });
        });
    }

    setupTriggers () {
        this.tilemap.objects.forEach(objectLayer => {
            if (objectLayer.name !== 'triggers') return;

            objectLayer.objects.forEach(trigger => {
                let triggerProperties = _.reduce(trigger.properties, (properties, property) => { properties[property.name] = property.value; return properties; }, {});

                let TriggerClass = this.getTriggerClass(triggerProperties.class); 

                let triggerInstance = new TriggerClass(this);
                triggerInstance.setPosition(trigger.x, trigger.y);
                triggerInstance.setSize(triggerProperties.width, triggerProperties.height);

                this.triggers.add(triggerInstance);
            }); 
        })
    }

    setupCollisionsAndOverlapping () {
        // add collisions/overlapping for actors
        this.actors.getChildren().forEach(child => {
            this.addColliders(child);
            this.addOverlapping(child);
        });

        // add collisions/overlapping for props
        this.props.getChildren().forEach(child => {
            this.addColliders(child);
            this.addOverlapping(child);
        });

        // add collisions/overlapping for triggers
        this.triggers.getChildren().forEach(child => {
            this.addColliders(child);
            this.addOverlapping(child);
        });
    }

    // provides an interface for a thing to setup collisions
    addColliders (thing) {
        let callback = thing.triggerCollisionHandlers ? (object1, object2) => { thing.triggerCollisionHandlers(object1, object2); } : () => {};
        let collisionSettings = thing.collisionSettings ? thing.collisionSettings() : { map: false, actors: false, props: false };

        if (collisionSettings.map && !thing._mapCollider) thing._mapCollider = this.physics.add.collider(thing, this.tileLayers.middle, callback); // thing to collide with map
        if (collisionSettings.actors && !thing._actorsCollider) thing._actorsCollider = this.physics.add.collider(thing, this.actors, callback);
        if (collisionSettings.props && !thing._propsCollider) thing._propsCollider = this.physics.add.collider(thing, this.props, callback);
    }

    // provides an interface for a thing to setup overlapping
    addOverlapping (thing) {
        let callback = thing.triggerOverlapHandlers ? (object1, object2) => { thing.triggerOverlapHandlers(object1, object2); } : () => {};
        let overlapSettings = thing.overlapSettings ? thing.overlapSettings() : { map: false, actors: false, props: false };

        if (overlapSettings.map && !thing._mapOverlapper) thing._mapOverlapper = this.physics.add.overlap(thing, this.tileLayers.middle, callback); // thing to collide with map
        if (overlapSettings.actors && !thing._actorsOverlapper) thing._actorsOverlapper = this.physics.add.overlap(thing, this.actors, callback);
        if (overlapSettings.props && !thing._propsOverlapper) thing._propsOverlapper = this.physics.add.overlap(thing, this.props, callback);
    }

    startCauldronUI() {
        this.scene.launch('CauldronUI', { scene: this });
    }

    pause () {
        this.scene.pause();

        if (this.uiScene) this.uiScene.pause();
    }

    resume () {
        this.scene.resume();

        if (this.uiScene) this.uiScene.resume();
    }

    getActorClass(className) {
        return {
            "Player": Player
        }[className];
    }

    getPropClass(className) {
        return {
            "Cauldron": Cauldron,
            "AirEssence": AirEssence,
            "DarkEssence": DarkEssence,
            "EarthEssence": EarthEssence,
            "FireEssence": FireEssence,
            "LightEssence": LightEssence,
            "MagicEssence": MagicEssence,
            "WaterEssence": WaterEssence
        }[className];
    }

    getTriggerClass(className) {
        return {
            "TutorialUseCauldron": TutorialUseCauldron
        }[className];
    }

    setUI (sceneKey) {
        this.scene.launch(sceneKey);
        this.uiScene = this.scene.get(sceneKey);
    }

    get ui () { return this.uiScene; }
};

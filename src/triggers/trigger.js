import Collider from './mixin/collider';

export default class Trigger extends Collider ( Phaser.GameObjects.Zone ) {
    constructor(scene) {
        super(scene);

        // for events
        this.events = new Phaser.Events.EventEmitter();

        // need to add an arcade physics body to the zone for collision
        scene.physics.add.existing(this);

        // generic collision - generates a touched event
        this.registerOverlapHandler('generic-touched-trigger-event', (object1, object2) => {
            let other = object1 == this ? object2 : object1;

            this.events.emit('touched', other);
        });
    }

    disable () {
        this.body.enable = false;
        this.body.active = false;
    }

    enable () {
        this.body.enable = true;
        this.body.active = true;
    }

    // when we change the width and height we need to update the body width and height for collisions as well
    setSize (width, height) {
        this.width = width;
        this.height = height;
        this.body.width = width;
        this.body.height = height;
    }
}
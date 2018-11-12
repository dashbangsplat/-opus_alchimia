import ActorNumberAttribute from '../actor-number-attribute';

export default class WalkVelocity extends ActorNumberAttribute {
    constructor (actor) {
        super(actor, 'Walk Velocity', 'The amount of velocity applied when walking.');

        this.minimum = 0;
        this.maximum = 1000;
    }
}
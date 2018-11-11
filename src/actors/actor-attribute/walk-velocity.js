import ActorAttribute from '../actor-attribute';

export default class WalkVelocity extends ActorAttribute {
    constructor (actor) {
        super(actor, 'Walk Velocity', 'The amount of velocity applied when walking.');

        this.minimum = 0;
        this.maximum = 1000;
    }
}
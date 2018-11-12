import ActorNumberAttribute from '../actor-number-attribute';

export default class JumpVelocity extends ActorNumberAttribute {
    constructor (actor) {
        super(actor, 'Jump Velocity', 'The amount of velocity applied when jumping.');

        this.minimum = 0;
        this.maximum = 1000;
    }
}
import ActorAttribute from '../actor-attribute';

export default class JumpVelocity extends ActorAttribute {
    constructor (actor) {
        super(actor, 'Jump Velocity', 'The amount of velocity applied when jumping.');

        this.minimum = 0;
        this.maximum = 1000;
    }
}
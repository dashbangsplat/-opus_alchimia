import ActorAttribute from '../actor-attribute';

export default class JumpDuration extends ActorAttribute {
    constructor (actor) {
        super(actor, 'Jump Duration', 'The duration in milliseconds for which a jump occurs.');

        this.minimum = 0;
        this.maximum = 10000;
    }
}
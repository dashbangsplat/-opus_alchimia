import ActorAttribute from '../actor-attribute';

export default class Bounce extends ActorAttribute {
    constructor (actor) {
        super(actor, 'Bounce', 'The amount of bounce that happens when colliding with something.');

        this.minimum = 0;
        this.maximum = 1;
    }

    updateValue (val) {
        super.updateValue(val);

        // we need a physics body on our actor before we can set this or there will be an error
        this.actor.setBounceY(this.value);
    }
}
import ActorNumberAttribute from '../actor-number-attribute';

export default class Strength extends ActorNumberAttribute {
    constructor (actor) {
        super(actor, 'Strength', 'The impacts the velocity and duration of thrown objects.');

        this.minimum = 0;
        this.maximum = 100;
    }
}
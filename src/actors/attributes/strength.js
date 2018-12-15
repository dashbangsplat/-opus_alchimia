import NumberAttribute from '../../generics/attribute/number';

export default class Strength extends NumberAttribute {
    constructor (actor) {
        super(actor, 'Strength', 'The impacts the velocity and duration of thrown objects.');

        this.minimum = 0;
        this.maximum = 100;
    }
}
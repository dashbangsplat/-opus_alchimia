import NumberAttribute from '../../generics/attribute/number';

export default class WalkVelocity extends NumberAttribute {
    constructor (actor) {
        super(actor, 'Walk Velocity', 'The amount of velocity applied when walking.');

        this.minimum = 0;
        this.maximum = 1000;
    }
}
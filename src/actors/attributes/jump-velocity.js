import NumberAttribute from '../../generics/attribute/number';

export default class JumpVelocity extends NumberAttribute {
    constructor (actor) {
        super(actor, 'Jump Velocity', 'The amount of velocity applied when jumping.');

        this.minimum = 0;
        this.maximum = 1000;
    }
}
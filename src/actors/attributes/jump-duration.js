import NumberAttribute from '../../generics/attribute/number';

export default class JumpDuration extends NumberAttribute {
    constructor (actor) {
        super(actor, 'Jump Duration', 'The duration in milliseconds for which a jump occurs.');

        this.minimum = 0;
        this.maximum = 10000;
    }
}
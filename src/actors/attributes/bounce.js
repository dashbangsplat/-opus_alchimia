import NumberAttribute from '../../generics/attribute/number';

export default class Bounce extends NumberAttribute {
    constructor (actor) {
        super(actor, 'Bounce', 'The amount of bounce that happens when colliding with something.');

        this.minimum = 0;
        this.maximum = 1;
    }

    updateValue (val) {
        super.updateValue(val);

        // we need a physics body on our actor before we can set this or there will be an error
        this.entity.setBounceY(this.value);
    }
}
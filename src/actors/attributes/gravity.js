import NumberAttribute from '../../generics/attribute/number';

export default class Gravity extends NumberAttribute {
    constructor (actor) {
        super(actor, 'Gravity', 'The amount of gravity, downward velocity, generally being applied.');

        this.minimum = 0;
        this.maximum = 1000;
    } 

    updateValue (val) {
        super.updateValue(val);

        // we need a physics body on our actor before we can set this or there will be an error
        this.entity.setGravityY(this.value);
    }
}
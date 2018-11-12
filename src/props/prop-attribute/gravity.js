import PropNumberAttribute from '../prop-number-attribute';

export default class Gravity extends PropNumberAttribute {
    constructor (actor) {
        super(actor, 'Gravity', 'The amount of gravity, downward velocity, generally being applied.');

        this.minimum = 0;
        this.maximum = 1000;
    } 

    updateValue (val) {
        super.updateValue(val);

        // we need a physics body on our actor before we can set this or there will be an error
        this.prop.setGravityY(this.value);
    }
}
import Attribute from '../attribute';

export default class BoolAttribute extends Attribute {
    constructor (entity, name, description, defaultValue = false) {
        super(entity, name, description);

        this._value = defaultValue;
    }

    // we set it up this way so that children can overwritten this as needed
    updateValue (val) {
        let value = new Boolean(val); // make sure this is a number

        this._value = value;
    }
}
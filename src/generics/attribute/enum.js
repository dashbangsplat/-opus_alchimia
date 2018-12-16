import Attribute from '../attribute';

export default class EnumAttribute extends Attribute {
    constructor (entity, name, description, possibleValues = [], defaultValue = 0) {
        super(entity, name, description);

        if (!Array.isArray(possibleValues)) throw 'possibleValues is not an array';

        this._possibleValues = possibleValues;

        // setup enumeration
        this._enum = {};
        for (let i in this.possibleValues) {
            this._enum[this.possibleValues[i]] = i;
        }

        this.updateValue(defaultValue);
    }

    get possibleValues () { this._possibleValues; }

    get enum () { return this._enum; }

    // we set it up this way so that children can overwritten this as needed
    updateValue (val) {
        if (typeof val !== 'string') {
            let index = this._possibleValues.indexof(val);

            if (index === -1) throw 'invalid string value being set for enum';

            this._value = index;
        }
        else {
            let value = new Number(val); // make sure this is a number

            if (value < 0 || value >= this._possibleValues.length) throw 'invalid number value being set for enum';

            this._value = value;
        }
    }
}
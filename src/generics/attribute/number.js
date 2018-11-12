import Attribute from '../attribute';

export default class NumberAttribute extends Attribute {
    constructor (name, description) {
        super(name, description);

        this._hasMinimumValue = false;
        this._minimumValue = 0;

        this._hasMaximumValue = false;
        this._maximumValue = 0;

        this._value = 0;
    }

    get minimum () { return this._minimumValue }

    set minimum (min) {
        let minimum = new Number(min); // make sure this is a number

        this._hasMinimumValue = true;

        // keep the range sane
        if (this._hasMaximumValue && minimum > this._maximumValue) minimum = this._maximumValue;

        this._minimumValue = minimum;

        // reset value based on new minimum
        this.value = this._value;
    }

    get maximum () { return this._maximumValue }

    set maximum (max) {
        let maximum = new Number(max); // make sure this is a number

        this._hasMaximumValue = true;

        // keep the range sane
        if (this._hasMinimumValue && maximum < this._minimumValue) maximum = this._minimumValue;

        this._maximumValue = maximum;

        // reset value based on new minimum
        this.value = this._value;
    }

    // we set it up this way so that children can overwritten this as needed
    updateValue (val) {
        let value = new Number(val); // make sure this is a number

        // keep value less than max
        if (this._hasMaximumValue && value > this._maximumValue) value = this._maximumValue;

        // keep value greater than min
        if (this._hasMinimumValue && value < this._minimumValue) value = this._minimumValue;

        this._value = value;
    }
}
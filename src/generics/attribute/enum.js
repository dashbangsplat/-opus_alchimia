import Attribute from '../attribute';

export default class EnumAttribute extends Attribute {
    constructor (entity, name, description, possibleValues = [], defaultValue = null) {
        super(entity, name, description);

        // setup enumeration
        this._enum = EnumAttribute.listToEnum(possibleValues);

        // store possible values
        this._possibleValues = possibleValues;

        if (defaultValue !== null) this.updateValue(defaultValue);
    }

    // things outside of us use this for conversion
    static listToEnum (list) {
        if (!Array.isArray(list)) throw 'list provided is not an array';

        let enumeratedList = {};

        for (let i in list) {
            enumeratedList[list[i]] = new Number(i).valueOf();
        }

        return enumeratedList;
    }

    get possibleValues () { return this._possibleValues; }

    get enum () { return this._enum; }

    updateValue (val) {
        if (typeof(val) === 'string') {
            let index = this.possibleValues.indexOf(val);

            if (index >= 0) {
                this._value = index;

                return;            
            }
        }

        let value = new Number(val).valueOf(); // make sure this is a number

        if (value >= 0 && value < this.possibleValues.length) this._value = value;
    }
}
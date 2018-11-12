export default class Attribute {
    constructor (name = 'Change Me', description = 'Change Me') {
        let thisName = this.constructor.name;
        this._key = thisName.charAt(0).toLowerCase() + thisName.slice(1);
        this._name = name;
        this._description = description;
    }

    get key () { return this._key }

    get name () { return this._name }

    get description () { return this._description }

    // we set it up this way so that children can overwrite this as needed
    updateValue (val) {
        this._value = val;
    }

    get value () { return this._value; }

    set value (val) { this.updateValue(val) }
}
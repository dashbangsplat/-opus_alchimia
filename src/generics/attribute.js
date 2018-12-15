export default class Attribute {
    constructor (entity = {}, name = 'Change Me', description = 'Change Me') {
        let thisName = this.constructor.name;
        this._key = thisName.charAt(0).toLowerCase() + thisName.slice(1);
        this._entity = entity; // the source entity (actors, props, etc) that has this attribute
        this._name = name; // the name of this attirbute
        this._description = description; // a summary of what this attribute is
    }

    get key () { return this._key }

    get entity () { return this._entity }

    get name () { return this._name }

    get description () { return this._description }

    // we set it up this way so that children can overwrite this as needed
    updateValue (val) {
        this._value = val;
    }

    get value () { return this._value; }

    set value (val) { this.updateValue(val) }
}
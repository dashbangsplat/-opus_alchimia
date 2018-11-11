import Attribute from './attribute';

export default class Attributes {
    constructor () {
        this._attributes = {};
    }

    get hash () { return this._attributes }

    get keys () { return Object.keys(this._attributes) }

    get values () { return Object.values(this._attributes) }

    addAttribute (attribute) {
        if (!(attribute instanceof Attribute)) throw `${attribute} is not an Attribute`;

        this._attributes[attribute.key] = attribute;

        // setup an accessor for the attribute on ourself if we can sanely do so
        if (!attribute.key.match(/^(hash|keys|values||addAttribute)$/)) {
            this[attribute.key] = attribute;
        }
    }
}
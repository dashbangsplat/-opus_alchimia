import BoolAttribute from '../generics/attribute/bool';

export default class PropBoolAttribute extends BoolAttribute {
    constructor (prop, name, description, defaultValue) {
        super(name, description, defaultValue);

        this._prop = prop; 
    }

    get prop () { return this._prop }
}
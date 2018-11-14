import NumberAttribute from '../generics/attribute/number';

export default class PropNumberAttribute extends NumberAttribute {
    constructor (prop, name, description) {
        super(name, description);

        this._prop = prop; 
    }

    get prop () { return this._prop }
}
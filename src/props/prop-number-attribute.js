import Prop from './prop';
import NumberAttribute from '../generics/attribute/number';

export default class PropNumberAttribute extends NumberAttribute {
    constructor (prop, name, description) {
        if (!prop || !(prop instanceof Prop)) throw `${prop} is not an prop`;

        super(name, description);

        this._prop = prop; 
    }

    get prop () { return this._prop }
}
import Prop from './prop';
import BoolAttribute from '../generics/attribute/bool';

export default class PropBoolAttribute extends BoolAttribute {
    constructor (prop, name, description, defaultValue) {
        if (!prop || !(prop instanceof Prop)) throw `${prop} is not an prop`;

        super(name, description, defaultValue);

        this._prop = prop; 
    }

    get prop () { return this._prop }
}
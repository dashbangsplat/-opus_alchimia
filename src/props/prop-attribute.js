import Prop from './prop';
import Attribute from '../generics/attribute';

export default class PropAttribute extends Attribute {
    constructor (prop, name, description) {
        if (!prop || !(prop instanceof Prop)) throw `${prop} is not an prop`;

        super(name, description);

        this._prop = prop; 
    }

    get prop () { return this._prop }
}
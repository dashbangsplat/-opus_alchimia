import BoolAttribute from '../../generics/attribute/bool';

export default class Active extends BoolAttribute {
    constructor (prop) {
        super(prop, 'Active', 'Whether the prop is active or not.', true);
    } 
}
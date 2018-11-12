import PropBoolAttribute from '../prop-bool-attribute';

export default class Active extends PropBoolAttribute {
    constructor (actor) {
        super(actor, 'Active', 'Whether the prop is active or not.', true);
    } 
}
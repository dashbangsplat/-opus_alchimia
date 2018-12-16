import EnumAttribute from '../../generics/attribute/enum';

export default class Facing extends EnumAttribute {
    constructor (actor) {
        super(
            actor, 
            'Facing',
            'The direction that the actor is facing, right or left.',
            ['RIGHT', 'LEFT'],
            'RIGHT'
        );
    }
}
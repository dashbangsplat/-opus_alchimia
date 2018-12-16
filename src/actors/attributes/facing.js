import EnumAttribute from '../../generics/attribute/enum';

let facingEnumList = ['UNDEFINED', 'RIGHT', 'LEFT'];

let facingEnum = EnumAttribute.listToEnum( facingEnumList );

export { facingEnumList, facingEnum }; // export static data

export default class Facing extends EnumAttribute {
    constructor (actor) {
        super(
            actor, 
            'Facing',
            'The direction that the actor is facing, right or left.',
            facingEnumList,
            'UNDEFINED'
        );
    }
}
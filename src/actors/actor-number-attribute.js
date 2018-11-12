import Actor from './actor';
import NumberAttribute from '../generics/attribute/number';

export default class ActorAttribute extends NumberAttribute {
    constructor (actor, name, description) {
        if (!actor || !(actor instanceof Actor)) throw `${actor} is not an actor`;

        super(name, description);

        this._actor = actor;
    }

    get actor () { return this._actor }
}
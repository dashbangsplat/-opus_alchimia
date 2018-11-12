import Actor from './actor';
import BoolAttribute from '../generics/attribute/bool';

export default class ActorAttribute extends BoolAttribute {
    constructor (actor, name, description) {
        if (!actor || !(actor instanceof Actor)) throw `${actor} is not an actor`;

        super(name, description);

        this._actor = actor;
    }

    get actor () { return this._actor }
}
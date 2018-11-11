import Actor from './actor';
import Attribute from '../generics/attribute';

export default class ActorAttribute extends Attribute {
    constructor (actor, name, description) {
        if (!actor || !(actor instanceof Actor)) throw `${actor} is not an actor`;

        super(name, description);

        this._actor = actor;
    }

    get actor () { return this._actor }
}
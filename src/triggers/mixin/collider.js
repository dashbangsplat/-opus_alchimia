export default (superclass) => class Collider extends superclass {

    registerCollisionHandler (key, callback) {
        this._collisionHandlers = this._collisionHandlers || {};

        if (!key) throw 'key is undefined';

        if (!callback || typeof callback !== 'function') {
            delete this._collisionHandlers[key];
            return;
        }

        this._collisionHandlers[key] = callback; 
    }

    triggerCollisionHandlers (object1, object2) {
        this._collisionHandlers = this._collisionHandlers || {};

        Object.values(this._collisionHandlers).forEach(handler => handler(object1, object2) );
    }

    // override this to change default collision settings. This is used in a scene to determine collision setup for a trigger
    collisionSettings () {
        return {
            map: false,
            actors: false,
            props: false
        };
    }

    registerOverlapHandler (key, callback) {
        this._overlapHandlers = this._overlapHandlers || {};

        if (!key) throw 'key is undefined';

        if (!callback || typeof callback !== 'function') {
            delete this._overlapHandlers[key];
            return;
        }

        this._overlapHandlers[key] = callback; 
    }

    triggerOverlapHandlers (object1, object2) {
        this._overlapHandlers = this._overlapHandlers || {};

        Object.values(this._overlapHandlers).forEach(handler => handler(object1, object2) );
    }

    // override this to change default overlap settings. This is used in a scene to determine overlap setup for a trigger
    overlapSettings () {
        return {
            map: false,
            actors: true,
            props: true 
        };
    }
}
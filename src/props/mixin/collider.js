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
}
// data setup for anything that wants to use these actions
export function setupCollisionDetectionOnThing(thing) {
    // collisionDetection
    thing.collisionDetection = {
        //colliding
        collidesWith: {},
        collisionHandlers: {},
        colliders: {},

        // overlapping
        overlapsWith: {},
        overlapHandlers: {},
        overlappers: {}
    };
}

// colliding related function
export function registerCollisionHanderForThing(thing, key, callback) {
    let { collisionDetection: { collisionHandlers } } = thing;

    if (!key) throw 'key is undefined';

    if (!callback || typeof callback !== 'function') throw 'callback is undefined or not a function';

    collisionHandlers[key] = callback; 
};

export function unregisterCollisionHandlerForThing(thing, key) {
    let { collisionDetection: { collisionHandlers } } = thing;

    if (!key) throw 'key is undefined';

    delete collisionHandlers[key];
}

export function destroyCollisionHandlersForThing(thing) {
    let { collisionDetection: { collisionHandlers } } = thing;

    collisionHandlers = undefined; 
}

export function triggerCollisionHandlersForThing(thing, object1, object2) {
    let { collisionDetection: { collisionHandlers } } = thing;

    let other = object1 === thing ? object2 : object1;

    Object.values(collisionHandlers).forEach(handler => handler(thing, other));
}

export function setCollidesWithTypeForThing(thing, type, collides = false) {
    let { collisionDetection: { collidesWith } } = thing;

    collidesWith[type] = collides;
}

export function registerColliderByTypeForThing(thing, type, colliderFactory) {
    let { collisionDetection: { collidesWith, colliders } } = thing;

    if (!colliderFactory || typeof colliderFactory !== 'function') throw 'colliderFactory is not a function';

    if (collidesWith[type] && !colliders[type]) colliders[type] = colliderFactory();
}

// overlapping related functions
export function registerOverlapHanderForThing(thing, key, callback) {
    let { collisionDetection: { overlapHandlers } } = thing;

    if (!key) throw 'key is undefined';

    if (!callback || typeof callback !== 'function') throw 'callback is undefined or not a function';

    overlapHandlers[key] = callback; 
};

export function unregisterOverlapHandlerForThing(thing, key) {
    let { collisionDetection: { overlapHandlers } } = thing;

    if (!key) throw 'key is undefined';

    delete overlapHandlers[key];
}

export function destroyOverlapHandlersForThing(thing) {
    let { collisionDetection: { overlapHandlers } } = thing;

    overlapHandlers = undefined; 
}

export function triggerOverlapHandlersForThing(thing, object1, object2) {
    let { collisionDetection: { overlapHandlers } } = thing;

    let other = object1 === thing ? object2 : object1;

    Object.values(overlapHandlers).forEach(handler => handler(thing, other) );
}

export function setOverlapsWithTypeForThing(thing, type, overlaps = false) {
    let { collisionDetection: { overlapsWith } } = thing;

    overlapsWith[type] = overlaps;
}

export function registerOverlapperByTypeForThing(thing, type, overlapperFactory) {
    let { collisionDetection: { overlapsWith, overlappers } } = thing;

    if (!overlapperFactory || typeof overlapperFactory !== 'function') throw 'overlapperFactory is not a function';

    if (overlapsWith[type] && !overlappers[type]) overlappers[type] = overlapperFactory();
}
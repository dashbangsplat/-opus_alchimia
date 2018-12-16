import { registerCollisionHanderForThing } from '../../generics/actions/collision';

export function throwProp(prop, x, y, throwVelocity, throwDuration = 0) {
    if (throwDuration > 0) {
        prop.hasLifespan = true;
        prop.lifespan = throwDuration;
    }

    registerCollisionHanderForThing(prop, 'collidesWhenThrown', (self, other) => {
        // break when we hit something 
        self.disableBody(true, true);
    });

    prop.enableBody(true, x, y, true, true).setVelocity(throwVelocity.x, throwVelocity.y);
}
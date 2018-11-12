export default (superclass) => class Throwable extends superclass {

    prepareToThrow (x, y, throwVelocity, throwDuration) {
        this._throwDuration = throwDuration;
        this._moveTime = 0;

        if (this.registerCollisionHandler) {
            this.registerCollisionHandler('collidesWhenThrown', (object1, object2) => {

                // break when we hit something 
                this.disableBody(true, true);
            });
        }

        this.enableBody(true, x, y, true, true).setVelocity(throwVelocity.x, throwVelocity.y);
    }

    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {
        let throwDuration = this._throwDuration;

        this._moveTime += delta;

        if (this._moveTime > throwDuration) {
            this._moveTime = 0;
            this.disableBody(true, true);
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
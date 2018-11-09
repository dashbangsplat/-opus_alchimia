export default (superclass) => class extends superclass {

    setWalkSpeed(walkSpeed) {
        this.walkSpeed = walkSpeed;
    }

    walkRight() {
        this.walkState = 'right';
    }

    walkLeft() {
        this.walkState = 'left';
    }

    isWalkingRight() {
        return this.walkState && this.walkState === 'right';
    }

    isWalkingLeft() {
        return this.walkState && this.walkState === 'left';
    }

    isStopped() {
        return this.walkState == null;
    }

    stopWalking() {
        this.walkState = null;
    }

    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {
        if (this.walkSpeed) {
            let vX = 0;

            switch (this.walkState) {
                case 'right':
                    vX = this.walkSpeed;
                    break;
                case 'left':
                    vX = -(this.walkSpeed);
                    break;
                default:
                    vX = 0;
                    break;
            }

            this.setVelocityX(vX);
        }
        else {
            console.log(`Please set walk speed so that ${typeof this} can walk!`);
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
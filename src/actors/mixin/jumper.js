export default (superclass) => class Jumper extends superclass {
    get isJumping () { return this._isJumping; }

    jump() {
        if (!this._isJumping) {
            this.groundY = this.y;
            this.onGround  = false;
            this._isJumping = true;
            this.jumpTime = 0;

            let jumpVelocity = this.attributes.jumpVelocity.value;
            this.setVelocityY(-jumpVelocity);
        }
    }

    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {
        let gravity = this.attributes.gravity.value;
        let jumpVelocity = this.attributes.jumpVelocity.value;
        let jumpDuration = this.attributes.jumpDuration.value;

        if (gravity && jumpVelocity && jumpDuration) {
            if (this._isJumping) {
                this.jumpTime += delta;

                if (this.jumpTime > jumpDuration) {
                    if (this.y >= this.groundY) {
                        this.onGround = true;
                        this._isJumping = false;
                        this.jumpTime = 0;
                    }
                }
                else if (this.jumpTime > jumpDuration / 1.5) {
                    this.setVelocityY(0);
                }
            }
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
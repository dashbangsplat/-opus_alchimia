export default (superclass) => class extends superclass {

    setGravity(gravity) {
        this.gravitySpeed = gravity;

        this.setGravityY(this.gravitySpeed);
    }

    setJumpSpeed(jumpSpeed) {
        this.jumpSpeed = jumpSpeed;
    }

    setJumpDuration(jumpDuration) {
        this.jumpDuration = jumpDuration;
        this.jumpTime = 0;
    }

    jump() {
        if (!this.isJumping) {
            this.groundY = this.y;
            this.onGround  = false;
            this.isJumping = true;
            this.jumpTime = 0;
        }
    }

    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {

        if (this.gravitySpeed && this.jumpSpeed && this.jumpDuration) {
            if (this.isJumping) {
                this.jumpTime += delta;

                if (this.jumpTime > this.jumpDuration) {
                    if (this.y >= this.groundY) {
                        this.onGround = true;
                        this.isJumping = false;
                        this.jumpTime = 0;
                    }
                }
                else {
                    if (this.jumpTime < this.jumpDuration / 1.5) {
                        this.setVelocityY(-this.jumpSpeed);
                    }
                    else {
                        this.setVelocityY(0);
                        this.setGravityY(this.gravitySpeed);
                    }
                }
            }
        }
        else {
            console.log(`Please set gravity, jump speed and jump duration so that ${typeof this} can jump!`);
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
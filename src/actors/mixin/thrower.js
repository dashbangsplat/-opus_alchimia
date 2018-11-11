export default (superclass) => class extends superclass {
    // TODO add thrower methods and preUpdate
    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
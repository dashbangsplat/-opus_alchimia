export default (superclass) => class Collectable extends superclass {

    addCollectionTarget (target) {
        if (! this.registerCollisionHandler) throw 'I am not collidable';

        this._collectionTargets = this._collectionTargets || [];

        if (! _.includes(this._collectionTargets, target)) {
            this.registerCollisionHandler(`collidesWithTarget${this._collectionTargets.length}`, (object1, object2) => {
                let other = object1 == this ? object2 : object1;

                if (other == target) this.disableBody(true, true);
            })
            
        }
    }
}
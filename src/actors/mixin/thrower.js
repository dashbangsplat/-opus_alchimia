import Prop from '../../props/prop';

export default (superclass) => class Thrower extends superclass {

    throw (prop, origin, target) {
        if (!(prop instanceof Prop)) throw `${prop} is not a Prop`;

        let angleToTarget = Phaser.Math.Angle.BetweenPoints(origin, target);

        let velocity = prop.scene.physics.velocityFromRotation(angleToTarget, this.attributes.strength.value * 30);

        prop.prepareToThrow(origin.x, origin.y, velocity, this.attributes.strength.value * 200);
    }
}
import PropDynamic from '../../props/prop-dynamic';

export default (superclass) => class Thrower extends superclass {

    throw (prop, origin, target) {
        if (!(prop instanceof PropDynamic)) throw `${prop} is not a dynamic prop`;

        let angleToTarget = Phaser.Math.Angle.BetweenPoints(origin, target);

        let velocity = prop.scene.physics.velocityFromRotation(angleToTarget, this.attributes.strength.value * 30);

        prop.prepareToThrow(origin.x, origin.y, velocity, this.attributes.strength.value * 200);
    }
}
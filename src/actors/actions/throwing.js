import Prop from '../../props/prop';

export function actorThrowsPropAtTarget(actor, prop, target) {
    if (!(prop instanceof Prop)) throw `${prop} is not a prop`;

    let angleToTarget = Phaser.Math.Angle.BetweenPoints(actor, target);

    let velocity = prop.scene.physics.velocityFromRotation(angleToTarget, actor.attributes.strength.value * 30);

    prop.prepareToThrow(actor.x, actor.y, velocity, actor.attributes.strength.value * 200);
}
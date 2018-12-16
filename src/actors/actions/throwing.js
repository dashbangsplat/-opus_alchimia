import Prop from '../../props/prop';
import { throwProp } from '../../props/actions/throwing';

export function actorThrowsPropAtTarget(actor, prop, target) {
    if (!(prop instanceof Prop)) throw `${prop} is not a prop`;

    let angleToTarget = Phaser.Math.Angle.BetweenPoints(actor, target);

    let velocity = prop.scene.physics.velocityFromRotation(angleToTarget, actor.attributes.strength.value * 30);

    throwProp(prop, actor.x, actor.y, velocity, actor.attributes.strength.value * 200);
}
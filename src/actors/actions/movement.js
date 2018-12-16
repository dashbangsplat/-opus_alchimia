import { facingEnum } from '../attributes/facing';

export function startActorWalkingRight (actor) {
    actor.attributes.facing.value = facingEnum.RIGHT;
}

export function startActorWalkingLeft (actor) {
    actor.attributes.facing.value = facingEnum.LEFT;
}

export function stopActorWalking (actor) {
    actor.attributes.facing.value = facingEnum.UNDEFINED;

    actor.setVelocityX(0);
}

export function isActorWalkingRight (actor) {
    return actor.attributes.facing.value == facingEnum.RIGHT;
}

export function isActorWalkingLeft (actor) {
    return actor.attributes.facing.value == facingEnum.LEFT;
}

export function isActorWalking (actor) {
    return actor.attributes.facing.value != facingEnum.UNDEFINED;
}

export function updateWalkingActor (actor, time, delta) {
    let { attributes: { facing, walkVelocity } } = actor;
    let [ actorVelocity, actorFacing ] = [ walkVelocity.value, facing.value ];

    let vX = 0;

    switch (actorFacing) {
        case facingEnum.RIGHT:
            vX = actorVelocity;
            break;
        case facingEnum.LEFT:
            vX = -actorVelocity;
            break;
        default:
            vX = 0;
            break;
    }

    actor.setVelocityX(vX);
}

export function startActorJumping (actor) {
    let { attributes: { jumpVelocity } } = actor;

    actor.setVelocityY(-jumpVelocity.value);
}
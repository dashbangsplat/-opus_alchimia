import StateMachine from '../generics/state-machine';

export default class Actor extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x = 0, y = 0, key, frame) {
        super(scene, x, y, key, frame);


        this._movementState = new StateMachine();
    }

    get movement () { return this._movementState }
}
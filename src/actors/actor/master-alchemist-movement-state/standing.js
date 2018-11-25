import State from '../../../generics/state';
import ChangeState from '../../../generics/state-action/change-state';
import WalkingRight from './walking-right';
import WalkingLeft from './walking-left';
import Jumping from './jumping';

export default class Standing extends State {
    init (data) {
        // set actor using destructuring
        let { actor } = data;

        let facing = actor.isWalkingLeft() ? 'left' : actor.isWalkingRight() ? 'right' : ''; 
        this.setStandingAnimation(actor, facing); 

        actor.stopWalking();

        return super.init(data);
    }

    run (data) {
        // set actor using destructuring
        let { actor } = data;

        // TODO - using AI determine next movement (whether it is to continue to stand or change state)
        
        return super.run(data);
    }

    setStandingAnimation (actor, facing = '') {
        // set animateStandingLeft and animateStandingRight using destructuring
        let { "config": { "anims": { "standLeft": { "key": animateStandingLeft }, "standRight": { "key": animateStandingRight } } } } = actor;

        switch (facing) {
            case 'left':
                actor.play(animateStandingLeft);
                break;
            case 'right':
                actor.play(animateStandingRight);
                break;
        }
    }
}
import SpeechBubble from '../ui/speech-bubble';

export default class StageUI extends Phaser.Scene {
    constructor (key) {
        if (!key || typeof key !== 'string') throw 'Scene key not defined!';

        super({ key: key });
    }

    init () {
        // bring myself to the front
        this.scene.bringToTop();
    }

    create () {
        this.speechBubble = new SpeechBubble(this);
        this.add.existing(this.speechBubble);

        this.hideSpeechBubble();

        this.events.emit('ui-created');
    }

    showSpeechBubble () { this.speechBubble.getChildren().forEach(child => (child.setVisible(true))); }

    hideSpeechBubble () { this.speechBubble.getChildren().forEach(child => (child.setVisible(false))); }

    setText (str, callback) {
        if (typeof callback !== 'function') callback = () => {};

        this.showSpeechBubble();

        this.speechBubble.text = str;

        this.speechBubble.events.once('text-animation-complete', () => {
            callback();
        });
    }

    pause () {
        this.scene.pause();
    }

    resume () {
        this.scene.resume();
    }
}
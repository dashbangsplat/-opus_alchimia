export default class SpeechBubble extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        this.events = new Phaser.Events.EventEmitter();

        let { game: { config: { width: screenWidth } } } = scene;
        [ this.bubbleMargin, this.bubblePadding ] = [ 10, 10 ];
        [ this.bubbleWidth, this.bubbleHeight ] = [ screenWidth - this.bubbleMargin * 2, 100 ];
        [ this.bubbleX, this.bubbleY ] = [ this.bubbleMargin, this.bubbleMargin ];

        this._bubble = new Phaser.GameObjects.Graphics(scene);

        //  Bubble color
        this._bubble.fillStyle(0x000000, .75);

        //  Bubble outline line style
        this._bubble.lineStyle(4, 0x0000af, .75);

        //  Bubble shape and outline
        this._bubble.strokeRoundedRect(this.bubbleX, this.bubbleY, this.bubbleWidth, this.bubbleHeight, 16);
        this._bubble.fillRoundedRect(this.bubbleX, this.bubbleY, this.bubbleWidth, this.bubbleHeight, 16);

        this.add(this._bubble, true);

        this._text = new Phaser.GameObjects.Text(scene, 0, 0, '', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff', align: 'center', wordWrap: { width: this.bubbleWidth - (this.bubblePadding * 2) } });

        this.add(this._text, true);

        this._textContent = '';
        this._displayText = '';
        this._textDisplayDelay = 50;
        this._textDisplayCurrentTime = 0;
    }

    get text () { return this._textContent; }

    set text (str) {
        this._textContent = str;

        this._displayText = '';
    }

    updateText (str) {
        this._text.setText(str);

        let b = this._text.getBounds();

        this._text.setPosition(this.bubbleX + (this.bubbleWidth / 2) - (b.width / 2), this.bubbleY + (this.bubbleHeight / 2) - (b.height / 2));
    }

    preUpdate (time, delta) {
        if (this._textContent.length != this._displayText.length) {
            this._textDisplayCurrentTime += delta;

            if (this._textDisplayCurrentTime > this._textDisplayDelay) {
                if (this._displayText.length == 0) {
                    this.events.emit('text-animation-started');
                }

                let index = this._displayText.length;
                this._displayText += this._textContent.substring(index, index + 1);
                this.updateText(this._displayText);
                this._textDisplayCurrentTime = 0;
                
                if (this._textContent.length == this._displayText.length) {
                    this.events.emit('text-animation-complete');
                }
            }
        }
    }
}
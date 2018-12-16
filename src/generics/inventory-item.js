export default class InventoryItem {
    constructor(gameObject) {
        this._type = gameObject.constructor.name;

        this._label = gameObject.label || '';

        let {
            texture,
            frame,
            isTinted,
            tintBottomLeft,
            tintBottomRight,
            tintFill,
            tintTopLeft,
            tintTopRight
        } = gameObject;

        this._icon = {
            texture,
            frame,
            isTinted,
            tintBottomLeft,
            tintBottomRight,
            tintFill,
            tintTopLeft,
            tintTopRight
        };
    }

    get type () { return this._type; }

    get label () { return this._label; }

    generateIcon (scene, x, y) { 
        let icon = new Phaser.GameObjects.Image(scene, x, y);
        
        icon.texture = this._icon.texture;
        icon.frame = this._icon.frame;

        if (this._icon.isTinted) {
            icon.setTint(this._icon.tintTopLeft, this._icon.tintTopRight, this._icon.tintBottomLeft, this._icon.tintBottomRight);
        }

        return icon;
    }
}
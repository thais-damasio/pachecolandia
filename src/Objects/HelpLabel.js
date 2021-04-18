import GameObject from './GameObject.js';

const FONT_STYLE = "bold 12pt Courier";
const FONT_COLOR = "#000000";
const SIZE_TEXT = 200;

class HelpLabel extends GameObject {
    /**
     * Constructor
     * @param {number} initialText - Initial score value
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return HelpLabel
     */
    constructor(initialText, canvasWidth, canvasHeight) {
        super(null, null, null, null, null);
        this.x = (canvasWidth - SIZE_TEXT) / 2;
        this.y = (canvasHeight / 2);
        this._startup(initialText);
    }

    /**
     * Initializes the variables
     * @private
     * @param {number} initialText - Initial score value
     * @return void
     */
    _startup(initialText) {
        this._text = initialText;
        this._timeToLive = 100;
    }

    /**
     * Draws the game object on the canvas
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        if (this._timeToLive > 0) {
            context.fillStyle = FONT_COLOR;
            context.font = FONT_STYLE;
            context.fillText(`${this._text}`, this.x, this.y, SIZE_TEXT);
            this._timeToLive--;
        }
    }
}

export default HelpLabel;
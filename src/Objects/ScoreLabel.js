import GameObject from './GameObject.js';

const FONT_STYLE = "bold 15pt Courier";
const FONT_COLOR = "#000000";
const SIZE_TEXT = 80;
const X = 5;
const Y = 20;

class ScoreLabel extends GameObject {
    /**
     * Constructor
     * @param {number} initialScore - Initial score value
     * @return ScoreLabel
     */
    constructor(initialScore) {
        super(null, null, null, null, null, X, Y);
        this._startup(initialScore);
    }

    /**
     * Initializes the variables
     * @private
     * @param {number} initialScore - Initial score value
     * @return void
     */
    _startup(initialScore) {
        this.totalScore = initialScore;
    }

    /**
     * Draws the game object on the canvas
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        context.fillStyle = FONT_COLOR;
        context.font = FONT_STYLE;
        context.fillText(`Score: ${this.totalScore}`, this.x, this.y, SIZE_TEXT);
    }
}

export default ScoreLabel;
import SpriteImg from "./../../assets/sprites/start.png";
import GameObject from './GameObject.js';

const SPRITE_X = 0;
const SPRITE_Y = 0;
const S_WIDTH = 713;
const S_HEIGHT = 470;
const OPACITY = 0.2;
const BACKGROUND_COLOR = "#000000";

class LogoGame extends GameObject {
    /**
     * Constructor
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return LogoGame
     */
    constructor(canvasWidth, canvasHeight) {
        const y = canvasHeight * 0.1;
        super(SpriteImg, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, 0, y, 0.48);
        this.x = (canvasWidth - this.width) / 2;
        this._startup(canvasWidth, canvasHeight);
    }

    /**
     * Initializes the variables
     * @private
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return void
     */
    _startup(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    /**
     * Draws the game object on the canvas
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        context.globalAlpha = OPACITY;
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        context.globalAlpha = 1;
        super.draw(context);
    }
}

export default LogoGame;
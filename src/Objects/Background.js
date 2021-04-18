import SpriteImg from './../../assets/sprites/background.png';
import GameObject from './GameObject.js';

const SPRITE_X = 0;
const SPRITE_Y = 0;
const S_WIDTH = 430;
const S_HEIGHT = 257;

class Background extends GameObject {
    /**
     * Constructor
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return Background
     */
    constructor(canvasWidth, canvasHeight) {
        const x = 0, y = (canvasHeight - S_HEIGHT);

        super(SpriteImg, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, x, y);
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
        this.groundHeight = 50;
    }

    /**
     * Draws the game object on the canvas
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        context.fillStyle = '#70c5ce';
        context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        context.drawImage(
            this.sprites,
            this.sX, this.sY,
            this.sWidth, this.sHeight,
            this.x - this.width, this.y,
            this.width, this.height,
        );
        context.drawImage(
            this.sprites,
            this.sX, this.sY,
            this.sWidth, this.sHeight,
            this.x, this.y,
            this.width, this.height,
        );
        context.drawImage(
            this.sprites,
            this.sX, this.sY,
            this.sWidth, this.sHeight,
            this.x + this.width, this.y,
            this.width, this.height,
        );
    }

    /**
     * Moves the background on the canvas
     * @param {number} speed - Speed of moviment
     * @return void
     */
    move(speed = 1) {
        const movimentation = this.x + speed;

        this.x = movimentation;
        this.x = movimentation % this.width;
    }
}

export default Background;
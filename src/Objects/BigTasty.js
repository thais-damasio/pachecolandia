import GameObject from './GameObject.js';

const spritePath = './../../assets/sprites/sprites.png';
const spriteX = 100;
const spriteY = 0;
const sWidth = 100;
const sHeight = 70;

class BigTasty extends GameObject {
    /**
     * Constructor
     * @return BigTasty
     */
    constructor() {
        const x = 50, y = 10;

        super(spritePath, spriteX, spriteY, sWidth, sHeight, x, y, 0.6);
    }

    /**
     * Draws the game object on the canvas
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        super.draw(context);
    }
};

export default BigTasty;
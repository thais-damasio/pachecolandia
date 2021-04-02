import GameObject from './GameObject.js';

const spritePath = './../../assets/sprites/sprites.png';
const spriteX = 0;
const spriteY = 0;
const sWidth = 100;
const sHeight = 148;

class Fries extends GameObject {
    /**
     * Constructor
     * @return Fries
     */
    constructor() {
        const x = 0, y = 10;

        super(spritePath, spriteX, spriteY, sWidth, sHeight, x, y, 0.4);
    }

    /**
     * Draws the game object on the canvas
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        super.draw(context);
    }
}

export default Fries;
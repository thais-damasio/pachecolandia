import GameObject from './GameObject.js';

const spritePath = './../../assets/sprites/sprites.png';
const spriteX = 200;
const spriteY = 0;
const sWidth = 100;
const sHeight = 82;

class Heart extends GameObject {
    /**
     * Constructor
     * @return Heart
     */
    constructor() {
        const x = 120, y = 10;

        super(spritePath, spriteX, spriteY, sWidth, sHeight, x, y, 0.5);
        this._startup();
    }

    /**
     * Initializes the variables
     * @private
     * @return void
     */
    _startup() {
        this.baseBackground = 430 - 82 * 0.5;
        this.rotation = 0;
    }

    /**
     * Draws the game object on the canvas
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        this.update();
        this.rotation += 1;

        super.drawRotate(context, this.rotation);
    }

    /**
     * Updates the game object on the frame
     * @return void
     */
    update() {
        this._handleGravity();
    }

    /**
     * Handles the gravity
     * @private
     * @return void
     */
    _handleGravity() {
        const speed = 1.5;
        this.y = this.y + speed;

        if (this.y >= this.baseBackground)
            this.y = this.baseBackground;
        else
            this.y = this.y + speed;
    }
}

export default Heart;
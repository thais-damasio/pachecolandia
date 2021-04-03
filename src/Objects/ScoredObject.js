import GameObject from "./GameObject.js";

const SPEED_Y = 1.5;

class ScoredObject extends GameObject {
    /**
     * Constructor
     * @param {String} spritesPath - Path to sprites image
     * @param {number} sX - Sprite `x`-axis
     * @param {number} sY - Sprite `y`-axis
     * @param {number} sWidth - Sprite width
     * @param {number} sHeight - Sprite height
     * @param {number} x - `x`-axis to render
     * @param {number} scale - scale to render the game object
     * @return ScoredObject
     */
    constructor(spritesPath, sX, sY, sWidth, sHeight, x = 0, scale = 1) {
        super(spritesPath, sX, sY, sWidth, sHeight, x, 0, scale);
        this.y = -this.height;

        this._startup();
    }

    /**
     * Initializes the variables
     * @private
     * @return void
     */
    _startup() {
        this.catched = false;
        this._rotation = 0;
    }

    /**
     * Draws the game object on the canvas
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        this.update();
        this._rotation += 1;

        if (!this.catched)
            super.drawRotate(context, this._rotation);
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
        this.y = this.y + SPEED_Y;
    }
}

export default ScoredObject;
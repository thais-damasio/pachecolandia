import DirectionsEnum from '../../utils/enum/Directions.enum.js';
import SpriteImg from './../../assets/sprites/pachequito.png';
import GameObject from './GameObject.js';

const SPRITE_X = 0;
const SPRITE_Y = 0;
const S_WIDTH = 125;
const S_HEIGHT = 170;
const SPEED_LIMIT_X = 5;
const SPEED_Y = -7;
const ACCELERATION = 0.01;
const GRAVITY = 0.02;

class Pachequito extends GameObject {
    /**
     * Constructor
     * @param {number} groundHeight - Ground height
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return Pachequito
     */
    constructor(groundHeight, canvasWidth, canvasHeight) {
        super(SpriteImg, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, 0, 0, 0.5);

        this.x = (canvasWidth - this.width) / 2;
        this.y = (canvasHeight - groundHeight - this.height)
        this._startup(canvasWidth, canvasHeight, groundHeight);
    }

    /**
     * Initializes the variables
     * @private
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @param {number} groundHeight - Ground height
     * @return void
     */
    _startup(canvasWidth, canvasHeight, groundHeight) {
        this._groundHeight = groundHeight;
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._currentFrame = 0;
        this._countBlinkFrames = 0;
        this.speedX = 0;
        this.speedY = 0;
        this._countFramesSpeeding = 0;
        this._countFramesJumping = 0;
        this._walkDirection = false;
        this.movimentos = [
            { sX: 0, sY: 0, },
            { sX: 0, sY: 170 }
        ];
    }

    /**
     * Draws the game object on the canvas
     * @protected
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        this.update();
        const { sX, sY } = this.movimentos[this._currentFrame];
        this.sX = sX;
        this.sY = sY;

        super.draw(context);
    }

    /**
     * Changes the direction in which the game object moves
     * @param {string|false} newDirection - New direction to walk
     * @return void
     */
    walk(newDirection) {
        if (this._walkDirection != newDirection) {
            this._walkDirection = newDirection;
            this._countFramesSpeeding = 0;
        }
    }

    /**
     * Updates the game object on the frame
     * @return void
     */
    update() {
        this._handleBlink();
        this._handleWalk();
        this._handleGravity();
    }

    /**
     * Updates the pachequito to jump in the game
     * @return void
     */
    jump() {
        const isOnTheGround = this.y === (this._canvasHeight - this._groundHeight - this.height);
        if (isOnTheGround) {
            this._countFramesJumping = 0;
            this.speedY = SPEED_Y;
        }
    }

    /**
     * Handles when the game object will be blinking
     * @private
     * @return void
     */
    _handleBlink() {
        this._countBlinkFrames++;
        if (this._countBlinkFrames == 1) {
            this._currentFrame = 1;
        }
        else if (this._countBlinkFrames == 10) {
            this._currentFrame = 0;
        }
        else if (this._countBlinkFrames == 20) {
            this._currentFrame = 1;
        }
        else if (this._countBlinkFrames == 30) {
            this._currentFrame = 0;
        }
        else if (this._countBlinkFrames == 90) {
            this._countBlinkFrames = 0;
        }
    }

    /**
     * Handles when the game object will be walking
     * @private
     * @return void
     */
    _handleWalk() {
        // Moves the pachequito to the right or left direction
        let factor = (this._walkDirection === DirectionsEnum.right) ? 1 : -1;

        // Slows down the pachequito
        if (!this._walkDirection)
            factor = (this.speedX < 0) ? 1 : -1;

        this.speedX = this.speedX + ACCELERATION * this._countFramesSpeeding * factor;
        // Limits pachequito speed
        if (Math.abs(this.speedX) > SPEED_LIMIT_X)
            this.speedX = SPEED_LIMIT_X * factor;
        // Stop the pachequito when he it doesn't slip anymore
        if (!this._walkDirection && ((this.speedX <= 0 && factor <= 0) || (this.speedX >= 0 && factor >= 0))) {
            this.speedX = 0;

            return;
        }

        const isCollidedRigthSideBoundary = this.x >= (this._canvasWidth - this.width);
        const isCollidedLeftSideBoundary = this.x <= 0;

        // Moves the pachequito when it doesn't collide with the canvas boundary
        const isCollided = isCollidedRigthSideBoundary || isCollidedLeftSideBoundary;
        if (!isCollided)
            this.x += this.speedX;
        else {
            this.speedX = 0;

            if (isCollidedLeftSideBoundary)
                this.x += 1;
            else
                this.x -= 1;
        }

        this._countFramesSpeeding++;
    }

    /**
     * Handles when the game object will be jumping
     * @private
     * @return void
     */
    _handleGravity() {
        const groundY = (this._canvasHeight - this._groundHeight - this.height);
        this.speedY += GRAVITY * this._countFramesJumping;
        this.y += this.speedY;

        // Makes the pachequito fall
        if (this.y >= groundY) {
            this.y = (this._canvasHeight - this._groundHeight - this.height);
            this.speedY = 0;
        }
        // Makes the pachequito jump
        else {
            this._countFramesJumping++;
        }
    }
}

export default Pachequito;
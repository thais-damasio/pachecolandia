import DirectionsEnum from '../../utils/enum/Directions.enum.js';
import GameObject from './GameObject.js';

const spritePath = './../../assets/sprites/sprites.png';
const spriteX = 434;
const spriteY = 0;
const sWidth = 125;
const sHeight = 170;

class Pachequito extends GameObject {
    /**
     * Constructor
     * @param {number} groundHeight - Ground height
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return Pachequito
     */
    constructor(groundHeight, canvasWidth, canvasHeight) {
        super(spritePath, spriteX, spriteY, sWidth, sHeight, 0, 0, 0.5);

        this.x = (canvasWidth - this.width) / 2;
        this.y = (canvasHeight - groundHeight - this.height)
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
        this.currentFrame = 0;
        this.countBlinkFrames = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.countFramesSpeeding = 0;
        this.countFramesPulando = 0;
        this.walkDirection = false;
        this.movimentos = [
            { spriteX: 434, spriteY: 0, },
            { spriteX: 434, spriteY: 170 }
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
        const { spriteX, spriteY } = this.movimentos[this.currentFrame];
        this.sX = spriteX;
        this.sY = spriteY;

        super.draw(context);
    }

    /**
     * Changes the direction in which the game object moves
     * @param {string} newDirection - New direction to walk
     * @return void
     */
    changeDirection(newDirection) {
        if (this.walkDirection != newDirection) {
            this.walkDirection = newDirection;
            this.countFramesSpeeding = 0;
        }
    }

    /**
     * Updates the game object on the frame
     * @return void
     */
    update() {
        this._handleBlink();
        this._handleWalk();
        // this.handleGravity();
    }

    /**
     * Handles when the game object will be blinking
     * @private
     * @return void
     */
    _handleBlink() {
        this.countBlinkFrames++;
        if (this.countBlinkFrames == 1) {
            this.currentFrame = 1;
        }
        else if (this.countBlinkFrames == 10) {
            this.currentFrame = 0;
        }
        else if (this.countBlinkFrames == 20) {
            this.currentFrame = 1;
        }
        else if (this.countBlinkFrames == 30) {
            this.currentFrame = 0;
        }
        else if (this.countBlinkFrames == 90) {
            this.countBlinkFrames = 0;
        }
    }

    /**
     * Handles when the game object will be walking
     * @private
     * @return void
     */
    _handleWalk() {
        const speedLimit = 5;
        let speed = 0.01;

        let factor;
        if (this.walkDirection === DirectionsEnum.right)
            factor = 1;
        else if (this.walkDirection === DirectionsEnum.left)
            factor = -1;
        else {
            if (this.speedX > 0) {
                factor = -1;
                speed = 0.01;
            }
            else if (this.speedX < 0) {
                factor = 1;
                speed = 0.01;
            }
            else factor = 0;
        }

        this.speedX = this.speedX + speed * this.countFramesSpeeding * factor;

        if (!this.walkDirection) {
            if ((this.speedX < 0 && factor < 0) || (this.speedX > 0 && factor > 0)) {
                this.speedX = 0;
            }
        }

        if (Math.abs(this.speedX) > speedLimit) {
            this.speedX = speedLimit * factor;
        }

        this.countFramesSpeeding++;

        if (this.speedX > 0) { //Direita
            //Aplicar posição
            const collided = this.x >= (this.canvasWidth - (this.width - 50));
            if (!collided) {
                this.x = this.x + this.speedX;
                // planoDeFundo.mover(-2);
            }
            else {
                this.speedX = 0;
                this.x -= 1;
                // planoDeFundo.mover(1);
            }
        }
        else if (this.speedX < 0) { //Esquerda
            //Aplicar posição
            const collided = this.x <= 0;
            if (!collided) {
                this.x = this.x + this.speedX;
                // planoDeFundo.mover(2);
            }
            else {
                this.speedX = 0;
                this.x += 1;
                // planoDeFundo.mover(-1);
            }
        }
    }

    jump() {
        if (this.y == chaoBase) {
            this.countFramesPulando = 0;
            this.velocidadeY = -4;
        }

    }

    handleGravity() {
        const gravidade = 0.02;
        this.countFramesPulando++;
        this.velocidadeY = this.velocidadeY + gravidade * this.countFramesPulando;
        this.y = this.y + this.velocidadeY;

        if (this.y >= chaoBase) {
            this.y = chaoBase;
            this.velocidadeY = 0;
        } else {
            this.y = this.y + this.velocidadeY;
        }
    }
}

export default Pachequito;
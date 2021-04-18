import SpriteImg from './../../assets/sprites/pachequito.png';
import GameObject from './GameObject.js';

const SPRITE_X = 0;
const SPRITE_Y = 0;
const S_WIDTH = 125;
const S_HEIGHT = 100;

class PachecoLife extends GameObject {
    /**
     * Constructor
     * @param {number} totalLife - Number of chances of Pachequito
     * @param {number} scoreLabelX - The `x`axis of scoreLabel
     * @return PachecoLife
     */
    constructor(totalLife, scoreLabelX) {
        super(SpriteImg, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, 0, 25, 0.15);

        this.x = scoreLabelX;
        this._startup(totalLife);
    }

    /**
     * Initializes the variables
     * @private
     * @param {number} totalLife - Number of chances of Pachequito
     * @return void
     */
    _startup(totalLife) {
        this.lostLifes = 0;
        this._totalLife = totalLife;
        let x = this.x;
        this._lifes = Array.from({ length: this._totalLife }, () => {
            const life = {
                x: x
            }
            x += (this.width + 3);

            return life;
        });
    }

    /**
     * Draws the game object on the canvas
     * @protected
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        for (let i = 0; i < (this._lifes.length - this.lostLifes); i++) {
            context.drawImage(
                this.sprites,
                this.sX, this.sY,
                this.sWidth, this.sHeight,
                this._lifes[i].x, this.y,
                this.width, this.height
            );
        }
    }

    hasLifes() {
        return this._totalLife > this.lostLifes;
    }
}

export default PachecoLife;
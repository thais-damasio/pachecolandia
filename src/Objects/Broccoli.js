import SpriteImg from './../../assets/sprites/broccoli.png';
import ScoredObject from './ScoredObject.js';

const SCORE_VALUE = 10;
const SPRITE_X = 0;
const SPRITE_Y = 0;
const S_WIDTH = 76;
const S_HEIGHT = 75;

class Broccoli extends ScoredObject {
    /**
     * Constructor
     * @param {number} x - `x`-axis to render
     * @return Broccoli
     */
    constructor(x) {
        super(SCORE_VALUE, SpriteImg, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, x, 0.75);
    }
}

export default Broccoli;
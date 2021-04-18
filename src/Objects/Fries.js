import SpriteImg from './../../assets/sprites/fries.png';
import ScoredObject from './ScoredObject.js';

const SCORE_VALUE = 0;
const SPRITE_X = 0;
const SPRITE_Y = 0;
const S_WIDTH = 100;
const S_HEIGHT = 148;

class Fries extends ScoredObject {
    /**
     * Constructor
     * @param {number} x - `x`-axis to render
     * @return Fries
     */
    constructor(x) {
        super(SCORE_VALUE, SpriteImg, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, x, 0.4);
    }
}

export default Fries;
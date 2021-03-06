import SpriteImg from './../../assets/sprites/bigtasty.png';
import ScoredObject from './ScoredObject.js';

const SCORE_VALUE = 0;
const SPRITE_X = 0;
const SPRITE_Y = 0;
const S_WIDTH = 100;
const S_HEIGHT = 70;

class BigTasty extends ScoredObject {
    /**
     * Constructor
     * @param {number} x - `x`-axis to render
     * @return BigTasty
     */
    constructor(x) {
        super(SCORE_VALUE, SpriteImg, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, x, 0.6);
    }
};

export default BigTasty;
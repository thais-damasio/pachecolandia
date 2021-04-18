import ScoredObject from './ScoredObject.js';

const SPRITE_PATH = './../../assets/sprites/coracao.png';
const SCORE_VALUE = 10;
const SPRITE_X = 0;
const SPRITE_Y = 0;
const S_WIDTH = 98;
const S_HEIGHT = 80;

class Heart extends ScoredObject {
    /**
     * Constructor
     * @param {number} x - `x`-axis to render
     * @return Heart
     */
    constructor(x) {
        super(SCORE_VALUE, SPRITE_PATH, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, x, 0.5);
    }
}

export default Heart;
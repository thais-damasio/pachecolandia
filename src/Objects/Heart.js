import ScoredObject from './ScoredObject.js';

const SPRITE_PATH = './../../assets/sprites/sprites.png';
const SPRITE_X = 200;
const SPRITE_Y = 0;
const S_WIDTH = 100;
const S_HEIGHT = 82;

class Heart extends ScoredObject {
    /**
     * Constructor
     * @param {number} x - `x`-axis to render
     * @return Heart
     */
    constructor(x) {
        super(SPRITE_PATH, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, x, 0.5);
    }
}

export default Heart;
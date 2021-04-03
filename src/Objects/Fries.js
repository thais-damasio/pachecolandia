import ScoredObject from './ScoredObject.js';

const SPRITE_PATH = './../../assets/sprites/sprites.png';
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
        super(SPRITE_PATH, SPRITE_X, SPRITE_Y, S_WIDTH, S_HEIGHT, x, 0.4);
    }
}

export default Fries;
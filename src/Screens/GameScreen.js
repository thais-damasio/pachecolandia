import GameObject from '../Objects/GameObject.js';

class GameScreen {
    /**
     * Constructor
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return GameScreen
     */
    constructor(canvasWidth, canvasHeight) {
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
    }

    /**
     * Returns the list of GameObjects to render the page
     * @return {Array<GameObject|GameObject[]>}
     */
    load() {
        throw new Error('Method \"getPageObjects\" was not implemented');
    }
}

export default GameScreen;
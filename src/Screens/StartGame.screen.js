import GameEventHandler from '../GameEventHandler.js';
import BackgroundObj from '../Objects/Background.js';
import PachequitoObj from '../Objects/Pachequito.js';
import ScoreLabelObj from '../Objects/ScoreLabel.js';
import LogoGameObj from '../Objects/LogoGame.js';
import GameScreen from './GameScreen.js';

class StartGameScreen extends GameScreen {
    /**
     * Constructor
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return StartGameScreen
     */
    constructor(canvasWidth, canvasHeight) {
        super(canvasWidth, canvasHeight);
    }

    /**
     * Returns the list of GameObjects to render the page
     * @return {Array<GameObject|GameObject[]>}
     */
    load() {
        this._ClickAction();
        return this._loadObjects();
    }

    /**
     * Registers objects in the engine
     * @private
     * @return {void}
     */
    _loadObjects() {
        this._backgroundObj = new BackgroundObj(this._canvasWidth, this._canvasHeight);
        this._pachequitoObj = new PachequitoObj(this._backgroundObj.groundHeight, this._canvasWidth, this._canvasHeight);
        this._scoreLabelObj = new ScoreLabelObj(0);
        this._logoGameObj = new LogoGameObj(this._canvasWidth, this._canvasHeight);

        return [this._backgroundObj, this._pachequitoObj, this._scoreLabelObj, this._logoGameObj];
    }


    /**
     * Registers the game's click event
     * @private
     * @return {void}
     */
    _ClickAction() {
        const startGame = () => {
            GameEventHandler.dispatchEvent("START");
            removeEventListener('click', startGame)
        }
        addEventListener('click', startGame);
    }

}

export default StartGameScreen;
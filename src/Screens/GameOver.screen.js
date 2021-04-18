import GameOverSound from './../../assets/sounds/game_over.wav';
import GameEventHandler from './../GameEventHandler.js';
import GameOverObj from './../Objects/GameOver.js';
import GameScreen from './GameScreen.js';

const GAMEOVER_SOUND = new Audio();
GAMEOVER_SOUND.src = GameOverSound;

class GameOverScreen extends GameScreen {
    /**
     * Constructor
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return GameOverScreen
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
        GAMEOVER_SOUND.loop = false;
        GAMEOVER_SOUND.volume = 0.3;
        GAMEOVER_SOUND.play();
        return this._loadObjects();
    }

    /**
     * Registers objects in the engine
     * @private
     * @return {void}
     */
    _loadObjects() {
        this._gameOver = new GameOverObj(this._canvasWidth, this._canvasHeight);

        return [this._gameOver];
    }


    /**
     * Registers the game's click event
     * @private
     * @return {void}
     */
    _ClickAction() {
        const startGame = () => {
            GameEventHandler.dispatchEvent("AGAIN");
            removeEventListener('click', startGame)
        }
        addEventListener('click', startGame);
    }

}

export default GameOverScreen;
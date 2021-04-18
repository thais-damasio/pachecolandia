import CatchHeartScreen from './Screens/CatchHeart.screen.js';
import StartGameScreen from './Screens/StartGame.screen.js';
import GameOverScreen from './Screens/GameOver.screen.js';
import GameEventHandler from './GameEventHandler.js';
import Engine from './Engine.js';

const BACKGROUND_SOUND = new Audio();
BACKGROUND_SOUND.src = '../assets/sounds/bass_loop.wav';

class Game {
    /**
     * Constructor
     * @param {HTMLCanvasElement} canvas - Canvas to render the game
     * @return {Game}
     */
    constructor(canvas) {
        this._gameWidth = canvas.width;
        this._gameHeight = canvas.height;
        this._engine = new Engine(canvas, this._getScreens(), "START");
    }

    /**
     * Creates and return the object with the game screens
     * @private
     * @return Screens
     */
    _getScreens() {
        return {
            CATCHHEART: new CatchHeartScreen(this._gameWidth, this._gameHeight),
            START: new StartGameScreen(this._gameWidth, this._gameHeight),
            GAMEOVER: new GameOverScreen(this._gameWidth, this._gameHeight)
        };
    }

    /**
     * Start the Game
     * @return {void}
     */
    start() {
        this._RegisterEvents();

        this._engine.loadGame();
    }

    /**
     * Registers the event handler in the game
     * @private
     * @return {void}
     */
    _RegisterEvents() {
        GameEventHandler.createEvent("AGAIN", () => {
            this._engine.setActivePage('START');
        });

        GameEventHandler.createEvent("GAMEOVER", () => {
            this._engine.setActivePage('GAMEOVER');
            BACKGROUND_SOUND.pause();
            BACKGROUND_SOUND.currentTime = 0;
        });

        GameEventHandler.createEvent("START", () => {
            BACKGROUND_SOUND.volume = 0.3;
            BACKGROUND_SOUND.loop = true;
            BACKGROUND_SOUND.play();

            this._engine.setActivePage('CATCHHEART');
        });
    }
}


export default Game;
import CatchHeartScreen from './Screens/CatchHeart.screen.js';
import StartGameScreen from './Screens/StartGame.screen.js';
import Engine from './Engine.js';

class Game {
    /**
     * Constructor
     * @param {HTMLCanvasElement} canvas - Canvas to render the game
     * @return Game
     */
    constructor(canvas) {
        this._gameWidth = canvas.width;
        this._gameHeight = canvas.height;
        const SCREENS = {
            CATCH_HEART: new CatchHeartScreen(this._gameWidth, this._gameHeight),
            START: new StartGameScreen(this._gameWidth, this._gameHeight)
        };
        this._engine = new Engine(canvas, SCREENS, "START");
    }

    /**
     * Start the Game
     * @return void
     */
    start() {
        this.ClickAction();
        this._engine.loadGame();
    }

    ClickAction() {
        window.addEventListener('click', (ev) => {
            if (this._engine._activeScreen === 'START') {
                this._engine.setActivePage('CATCH_HEART');
            }
        });
    }
}


export default Game;
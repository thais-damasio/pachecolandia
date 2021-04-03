import DirectionsEnum from '../utils/enum/Directions.enum.js';
import BackgroundObj from './Objects/Background.js';
import PachequitoObj from './Objects/Pachequito.js';
import BigTastyObj from './Objects/BigTasty.js';
import FriesObj from './Objects/Fries.js';
import HeartObj from './Objects/Heart.js';
import Engine from './Engine.js';

class Game {
    /**
     * Constructor
     * @param {HTMLCanvasElement} canvas - Canvas to render the game
     * @return Game
     */
    constructor(canvas) {
        this.engine = new Engine(canvas);
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
    }

    /**
     * Start the Game
     * @return void
     */
    start() {
        const backgroundObj = new BackgroundObj(this.gameWidth, this.gameHeight);
        const pachequitoObj = new PachequitoObj(backgroundObj.groundHeight, this.gameWidth, this.gameHeight);
        const friesObj = new FriesObj();
        const bigTastyObj = new BigTastyObj();
        const heartObj = new HeartObj();

        this.engine.registerObject(backgroundObj);
        this.engine.registerObject(pachequitoObj);
        this.engine.registerObject(friesObj);
        this.engine.registerObject(bigTastyObj);
        this.engine.registerObject(heartObj);

        this._registerKeyDownActions(pachequitoObj);
        this._registerKeyUpActions(pachequitoObj);
        this.engine.loadGame();
    }

    /**
     * Registers the buttons' events (keydown) of the game
     * @param {PachequitoObj} pachequitoObj - Object which represents Pachequito
     * @return void
     */
    _registerKeyDownActions(pachequitoObj) {
        window.addEventListener('keydown', function (ev) {
            if (ev.key === 'ArrowRight') {
                pachequitoObj.walk(DirectionsEnum.right);
            }
            else if (ev.key === 'ArrowLeft') {
                pachequitoObj.walk(DirectionsEnum.left);
            }
            else if (ev.key === 'ArrowUp') {
                pachequitoObj.jump();
            }
        });
    }

    /**
     * Registers the buttons' events (keydown) of the game
     * @param {PachequitoObj} pachequitoObj - Object which represents Pachequito
     * @return void
     */
    _registerKeyUpActions(pachequitoObj) {
        window.addEventListener('keyup', function (ev) {
            if (ev.key === 'ArrowRight') {
                pachequitoObj.walk(false);
            }
            else if (ev.key === 'ArrowLeft') {
                pachequitoObj.walk(false);
            }
        });
    }
}


export default Game;
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

        // this._registerLeftAndRightKeyAction(pachequitoObj);
        // this._registerUpKeyAction();
        this.engine.loadGame();
    }

    // /**
    //  * 
    //  * @param {PachequitoObj} pachequitoObj 
    //  */
    // _registerLeftAndRightKeyAction(pachequitoObj) {
    //     window.addEventListener('keydown', function (ev) {
    //         if (ev.key === 'ArrowRight') {
    //             pachequitoObj.changeDirection("Right");
    //         }
    //         else if (ev.key === 'ArrowLeft') {
    //             pachequitoObj.changeDirection("Left");
    //         }
    //         else if (ev.key === 'ArrowUp') {
    //             pachequitoObj.jump();
    //         }
    //     });
    // }

    // _registerUpKeyAction() {
    //     window.addEventListener('keyup', function (ev) {
    //         if (ev.key === 'ArrowRight') {
    //             pachequito.mudarSentido(false);
    //         }
    //         else if (ev.key === 'ArrowLeft') {
    //             pachequito.mudarSentido(false);
    //         }
    //     });
    // }
}


export default Game;
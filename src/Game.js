import KeyDownAction from './Actions/KeyDownAction.action.js';
import RandomNumber from '../utils/tools/randomNumber.js';
import KeyUpAction from './Actions/KeyUpAction.action.js';
import ScoredObject from './Objects/ScoredObject.js';
import BackgroundObj from './Objects/Background.js';
import PachequitoObj from './Objects/Pachequito.js';
import ScoreLabelObj from './Objects/ScoreLabel.js';
import BigTastyObj from './Objects/BigTasty.js';
import FriesObj from './Objects/Fries.js';
import HeartObj from './Objects/Heart.js';
import Engine from './Engine.js';

const TOTAL_SCORED_OBJECTS = 4;

class Game {
    /**
     * Constructor
     * @param {HTMLCanvasElement} canvas - Canvas to render the game
     * @return Game
     */
    constructor(canvas) {
        this._engine = new Engine(canvas);
        this._gameWidth = canvas.width;
        this._gameHeight = canvas.height;
    }

    /**
     * Start the Game
     * @return void
     */
    start() {
        const typesScoredObjects = [
            { class: FriesObj, max: 3, total: 0 },
            { class: BigTastyObj, max: 3, total: 0 },
            { class: HeartObj, max: 1, total: 0 }
        ];
        const backgroundObj = new BackgroundObj(this._gameWidth, this._gameHeight);
        const pachequitoObj = new PachequitoObj(backgroundObj.groundHeight, this._gameWidth, this._gameHeight);
        const scoredObjects = this.criateScoredObjects([...typesScoredObjects]);
        const scoreLabelObj = new ScoreLabelObj(0);

        this._engine.registerObject(backgroundObj);
        this._engine.registerObject(pachequitoObj);
        this._engine.registerObject(scoredObjects);
        this._engine.registerObject(scoreLabelObj);
        this._engine.setPreRendering(
            this.updateScoredObjects.bind(this, pachequitoObj, scoredObjects, scoreLabelObj, typesScoredObjects)
        );

        this._registerActions(pachequitoObj);

        this._engine.loadGame();
    }

    _registerActions(pachequitoObj) {
        KeyDownAction(pachequitoObj);
        KeyUpAction(pachequitoObj);

    }

    /**
     * Creates a scored objects collection
     * @param {{class: typeof ScoredObject, max: number, total: number}[]} types - Types 
     * allowed to put in ScoredObject colletion
     * @return ScoredObject[]
     */
    criateScoredObjects(types) {
        const scoredObjects = [];
        for (let i = 0; i < TOTAL_SCORED_OBJECTS; i++) {
            const randomKey = RandomNumber.generateKeyRandomForArray(types.length);
            const selectedType = types[randomKey];

            const x = RandomNumber.generateRandomInt(0, this._gameWidth);
            scoredObjects.push(new selectedType.class(x));
            selectedType.total++;

            if (selectedType.total >= selectedType.max) {
                selectedType.total = 0;
                types.splice(randomKey, 1);
            }
        }

        return scoredObjects;
    }

    /**
     * Updates the scored objects collection when an object exceeds the canvas
     * boundary (y-axis). Another object is generated and placed at the beginning
     * of the canvas to fall again.
     * @param {PachequitoObj} pachequitoObj - Object which represents Pachequito
     * @param {ScoredObject[]} scoredObjects - List with ScoredObjects to be updated
     * @param {ScoreLabelObj} scoreLabelObj - Object which represents score label of the game
     * @param {{class: typeof ScoredObject, max: number, total: number}[]} types - Types 
     * allowed to put in ScoredObject colletion
     * @return void
     */
    updateScoredObjects(pachequitoObj, scoredObjects, scoreLabelObj, types) {
        scoredObjects.forEach((obj, key) => {
            if (!obj.catched) {
                obj.catched = obj.hasIntersection(pachequitoObj);
                if (obj.catched)
                    scoreLabelObj.totalScore += obj.scoreValue;
            }

            if (obj.y >= this._gameHeight) {
                const randomKey = RandomNumber.generateKeyRandomForArray(types.length);
                const selectedType = types[randomKey];

                const x = RandomNumber.generateRandomInt(0, this._gameWidth);
                scoredObjects[key] = new selectedType.class(x);
            }
        });
    }
}


export default Game;
import RandomNumber from '../../utils/tools/randomNumber.js';
import KeyDownAction from '../Actions/KeyDown.action.js';
import ScoredObject from '../Objects/ScoredObject.js';
import KeyUpAction from '../Actions/KeyUp.action.js';
import BackgroundObj from '../Objects/Background.js';
import PachequitoObj from '../Objects/Pachequito.js';
import ScoreLabelObj from '../Objects/ScoreLabel.js';
import BigTastyObj from '../Objects/BigTasty.js';
import FriesObj from '../Objects/Fries.js';
import HeartObj from '../Objects/Heart.js';
import GameScreen from './GameScreen.js';
import Engine from '../Engine.js';

const TOTAL_SCORED_OBJECTS = 4;
const TYPES_SCORED_OBJECTS = [
    { class: FriesObj, max: 3, total: 0 },
    { class: BigTastyObj, max: 3, total: 0 },
    { class: HeartObj, max: 1, total: 0 }
];

class CatchHeartScreen extends GameScreen {
    /**
     * Constructor
     * @param {number} canvasWidth - Game canvas width
     * @param {number} canvasHeight - Game canvas height
     * @return CatchHeartScreen
     */
    constructor(canvasWidth, canvasHeight) {
        super(canvasWidth, canvasHeight);
    }

    /**
     * Returns the list of GameObjects to render the page
     * @param {Engine} engine - The game engine
     * @return {Array<GameObject|GameObject[]>}
     */
    load(engine) {
        const objects = this._loadObjects();
        this._setPreRendering(engine);
        this._registerActions();

        return objects;
    }

    /**
     * Returns the list of GameObjects to render the page
     * @return {Array<GameObject|GameObject[]>}
     */
    _loadObjects() {
        this._backgroundObj = new BackgroundObj(this._canvasWidth, this._canvasHeight);
        this._pachequitoObj = new PachequitoObj(this._backgroundObj.groundHeight, this._canvasWidth, this._canvasHeight);
        this._scoredObjects = this._criateScoredObjects();
        this._scoreLabelObj = new ScoreLabelObj(0);

        return [this._backgroundObj, this._pachequitoObj, this._scoredObjects, this._scoreLabelObj];
    }

    /**
     * Set the engine pre-rendering function
     * @private
     * @param {Engine} engine - The game engine
     * @return {void}
     */
    _setPreRendering(engine) {
        engine.setPreRendering(
            this._updateScoredObjects.bind(
                this,
                this._pachequitoObj,
                this._scoredObjects,
                this._scoreLabelObj,
                TYPES_SCORED_OBJECTS
            )
        );
    }

    /**
     * Registers actions triggered by screen events
     * @private
     * @return {void}
     */
    _registerActions() {
        KeyDownAction(this._pachequitoObj);
        KeyUpAction(this._pachequitoObj);
    }

    /**
     * Creates a scored objects collection
     * @private
     * @return {ScoredObject[]}
     */
    _criateScoredObjects() {
        const types = [...TYPES_SCORED_OBJECTS];
        const scoredObjects = [];
        for (let i = 0; i < TOTAL_SCORED_OBJECTS; i++) {
            const randomKey = RandomNumber.generateKeyRandomForArray(types.length);
            const selectedType = types[randomKey];

            const x = RandomNumber.generateRandomInt(0, this._canvasWidth);
            scoredObjects.push(new selectedType.class(x));
            selectedType.total++;

            if (selectedType.total >= selectedType.max) {
                selectedType.total = 0;
                types.splice(randomKey, 1);
            }
        }

        types.forEach((t) => t.total = 0);

        return scoredObjects;
    }

    /**
     * Updates the scored objects collection when an object exceeds the canvas
     * boundary (y-axis). Another object is generated and placed at the beginning
     * of the canvas to fall again.
     * @private
     * @return {void}
     */
    _updateScoredObjects() {
        const types = [...TYPES_SCORED_OBJECTS];
        this._scoredObjects.forEach((obj, key) => {
            if (!obj.catched) {
                obj.catched = obj.hasIntersection(this._pachequitoObj);
                if (obj.catched)
                    this._scoreLabelObj.totalScore += obj.scoreValue;
            }

            if (obj.y >= this._canvasHeight) {
                const randomKey = RandomNumber.generateKeyRandomForArray(types.length);
                const selectedType = types[randomKey];

                const x = RandomNumber.generateRandomInt(0, this._canvasWidth);
                this._scoredObjects[key] = new selectedType.class(x);
            }
        });
    }
}

export default CatchHeartScreen;
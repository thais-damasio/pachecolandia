import GameObject from './Objects/GameObject.js';

class Engine {
    /**
     * Constructor
     * @param {HTMLCanvasElement} canvas - Canvas to render the game
     * @return Engine
     */
    constructor(canvas) {
        this._objects = [];
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this._preRenderingEvent = () => { };
    }

    /**
     * Sets the pre-rendering function
     * @param {function} callback - Callback to be executed before rendering the game
     * @return void
     */
    setPreRendering(callback = () => { }) {
        this._preRenderingEvent = callback;
    }

    /**
     * Registers new game object in the Engine
     * @param {GameObject|GameObject[]} obj - New game object or game object collection
     * to be rendered
     * @return void
     */
    registerObject(obj) {
        this._objects.push(obj);
    }

    /**
     * Loop function which renders the game frames
     * @return void
     */
    loadGame() {
        this._preRenderingEvent();
        this._objects.forEach((object) => {
            if (Array.isArray(object))
                object.forEach((element) => element.draw(this.context));
            else
                object.draw(this.context);
        });

        requestAnimationFrame(this.loadGame.bind(this));
    }
}


export default Engine;
import GameObject from './Objects/GameObject.js';

class Engine {
    /**
     * Constructor
     * @param {HTMLCanvasElement} canvas - Canvas to render the game
     * @return {Engine}
     */
    constructor(canvas, screens, activeScreenDefault) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this._preRenderingEvent = () => { };
        this._screens = screens;
        this._activeScreen = this._oldScreen = activeScreenDefault;
        this._objects = this._screens[this._activeScreen].load(this);
    }

    /**
     * Sets the pre-rendering function
     * @param {function} callback - Callback to be executed before rendering the game
     * @return {void}
     */
    setPreRendering(callback = () => { }) {
        this._preRenderingEvent = callback;
    }

    /**
     * Changes the active screen
     * @param {String} screenName - The name of the screen that will be active
     * @return {void}
     */
    setActivePage(screenName) {
        this._oldScreen = this._activeScreen;
        this._activeScreen = screenName;
    }

    /**
     * Loop function which renders the game frames
     * @return {void}
     */
    loadGame() {
        if (this._screens[this._oldScreen] !== this._screens[this._activeScreen]) {
            this._oldScreen = this._activeScreen;
            this._objects = this._screens[this._activeScreen].load(this);
        }
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
import GameObject from './Objects/GameObject.js';

class Engine {
    /**
     * Constructor
     * @param {HTMLCanvasElement} canvas - Canvas to render the game
     * @return Engine
     */
    constructor(canvas) {
        this.objects = [];
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    /**
     * Registers new game object in the Engine
     * @param {GameObject} obj - New game object to be rendered
     * @return void
     */
    registerObject(obj) {
        this.objects.push(obj);
    }

    /**
     * Loop function which renders the game frames
     * @return void
     */
    loadGame() {
        this.objects.forEach((o) => {
            o.draw(this.context);
        });

        requestAnimationFrame(this.loadGame.bind(this));
    }
}


export default Engine;
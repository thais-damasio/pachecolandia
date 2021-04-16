class GameEventHandler {
    /**
     * Creates an object to handle events emitted in the game (singleton) 
     * @return {GameEventHandler}
     */
    constructor() {
        if (!this._eventHandler) {
            this._events = {};
            this._eventHandler = new EventTarget();
        }
    }

    /**
     * Creates a new event
     * @param name - Event name     
     * @param callback - Event callback
     * @return {void}
     */
    createEvent(name, callback) {
        this._events = { [name]: new Event(name), ...this._events };
        this._eventHandler.addEventListener(name, callback);
    }

    /**
     * Dispatches an existing event
     * @param name - Event name
     * @return {void}
     */
    dispatchEvent(name) {
        if (this._events[name])
            this._eventHandler.dispatchEvent(this._events[name]);
    }

}

export default new GameEventHandler();
class GameObject {
    /**
     * Constructor
     * @param {String} spritesPath - Path to sprites image
     * @param {number} sX - Sprite `x`-axis
     * @param {number} sY - Sprite `y`-axis
     * @param {number} sWidth - Sprite width
     * @param {number} sHeight - Sprite height
     * @param {number} x - `x`-axis to render
     * @param {number} y - `y`-axis to render
     * @param {number} scale - scale to render the game object
     * @return GameObject
     */
    constructor(spritesPath, sX, sY, sWidth, sHeight, x = 0, y = 0, scale = 1) {
        if (spritesPath)
            (this.sprites = new Image()).src = spritesPath;
        else
            this.sprites = null;
        this.sX = sX;
        this.sY = sY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.x = x;
        this.y = y;
        this.width = (this.sWidth * scale);
        this.height = (this.sHeight * scale);
    }

    /**
     * Draws the game object on the canvas
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @return void
     */
    draw(context) {
        context.drawImage(
            this.sprites,
            this.sX, this.sY,
            this.sWidth, this.sHeight,
            this.x, this.y,
            this.width, this.height
        );
    }

    /**
     * Draws a rotating game object
     * @param {CanvasRenderingContext2D} context - Canvas context
     * @param {number} deg - Degrees for rotation
     * @return void
     */
    drawRotate(context, deg) {
        // Store the current context state (i.e. rotation, translation etc..)
        context.save()

        //Convert degrees to radian 
        const rad = deg * Math.PI / 180;

        //Set the origin to the center of the image
        context.translate(this.x + this.width / 2, this.y + this.height / 2);

        //Rotate the canvas around the origin
        context.rotate(rad);

        //draw the image    
        context.drawImage(
            this.sprites,
            this.sX,
            this.sY,
            this.sWidth,
            this.sHeight,
            this.width / 2 * (-1),
            this.height / 2 * (-1),
            this.width,
            this.height);

        // Restore canvas state as saved from above
        context.restore();
    }

    /**
     * Check if the instance intersects with another object
     * @param {GameObject} object - Object to check if it intersects with the
     * game object instance
     * @return Boolean
     */
    hasIntersection(object) {
        return !(object.x > (this.x + this.width) ||
            (object.x + object.width) < this.x ||
            object.y > (this.y + this.height) ||
            (object.y + object.height) < this.y);
    }
}

export default GameObject;
class RandomNumber {
    /**
     * Generates a random integer number that belongs to the specified range
     * @param {number} min - Minimum value for the number generated
     * @param {number} max - Maximum value for the number generated
     * @return {number}
     */
    static generateRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Generates a random key to get some value in an array
     * @param {number} arrayLength - Array length
     * @return {number}
     */
    static generateKeyRandomForArray(arrayLength) {
        return Math.floor(Math.random() * arrayLength);
    }
}

export default RandomNumber;
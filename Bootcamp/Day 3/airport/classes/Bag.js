class Bag {
    constructor(weight, colour) {
        if (weight == null) {
            throw new Error('bag must have a weight')
        }
        this.weight = weight;
        this.colour = colour;
    }
}

module.exports = Bag;
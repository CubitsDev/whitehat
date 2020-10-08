class Bag {
    constructor(weight, colour) {
        if (weight == null) {
            throw new Error('bag must have a weight')
        }
        this.weight = weight;
        this.colour = colour;
        this.storage = [];
    }

    addItemToBag(item) {
        if (item.type != 'Personal') {
            return 'This is not a personal Item!'
        } else {
            this.storage.push(item);
        }
    }
}

module.exports = Bag;
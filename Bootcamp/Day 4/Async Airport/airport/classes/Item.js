const {itemTypes} = require('../allTypes');
class Item {
    constructor(name, type) {
        if (!itemTypes.includes(type)) {
            throw new Error('Item must be valid type.');
        }
        this.name = name;
        this.type = type;
    }
}

class ShopItem extends Item {
    constructor(name, type, price) {
        super(name, type);
        this.price = price;
    }
}

class PersonalItem extends Item {
    constructor(name, type) {
        super(name, type);
    }
}

module.exports = {Item, ShopItem, PersonalItem};
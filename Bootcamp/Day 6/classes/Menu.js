module.exports = class Menu {
    constructor(name) {
        this.name = name
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1)
    }
}
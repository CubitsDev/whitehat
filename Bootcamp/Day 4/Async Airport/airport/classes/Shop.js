class Shop {
    constructor(name) {
        this.name = name;
        this.items = [];
        this.staff = [];
    }

    addStaff(person) {
        this.staff.push(person);
    }

    addItem(item) {
        this.items.push(item);
    }
}

module.exports = Shop;
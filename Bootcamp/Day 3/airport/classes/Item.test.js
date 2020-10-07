const Item = require("./Item")

describe('Item Tests', () => {
    test('Item can have a name', () => {
        let item = new Item('Coffee', 1.5);
        expect(item.name).toBe('Coffee');
    });
    test('Item can have a price', () => {
        let item = new Item('Coffee', 1.5);
        expect(item.price).toBe(1.5);
    });
})
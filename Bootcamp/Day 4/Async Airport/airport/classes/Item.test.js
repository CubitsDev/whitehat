const {Item, PersonalItem, ShopItem} = require("./Item");
const Shop = require("./Shop");

describe('Item Tests', () => {
    test('All Item types can have a name', () => {
        let item1 = new ShopItem('Coffee', 'Shop', 1.5);
        let item2 = new PersonalItem('Pillow', 'Personal')
        expect(item1.name).toBe('Coffee');
        expect(item2.name).toBe('Pillow');
    });
    test('Item can have a price', () => {
        let item = new ShopItem('Coffee', 'Shop', 1.5);
        expect(item.price).toBe(1.5);
    });
    test('Item will always have a valid type', () => {
        expect(() => new ShopItem('Test', 'Shop', 1.2)).not.toThrowError('Item must be valid type.')
        expect(() => new ShopItem('Test', 'no', 1.2)).toThrowError('Item must be valid type.')
    })
})
const Bag = require('./bag');
const {PersonalItem, ShopItem} = require('./Item');

describe('Bag Tests', () => {
    var bag = new Bag(12, 'Red');
    test('Bag has a weight', () => {
        expect(bag.weight).toBe(12);
    })
    test('Bag must have a weight', () => {
        expect(() => new Bag()).toThrowError('bag must have a weight')
    })
    test('Bag has a Colour', () => {
        expect(bag.colour).toBe('Red');
    })
    test('Bag can store Items', () => {
        var pillow = new PersonalItem('Pillow', 'Personal');
        bag.addItemToBag(pillow);
        expect(bag.storage.includes(pillow)).toBeTruthy();
    })
    test('Bag will not store ShopItems', () => {
        var coffee = new ShopItem('Coffee', 'Shop', 1.2);
        expect(bag.addItemToBag(coffee)).toBe('This is not a personal Item!');
    })
})
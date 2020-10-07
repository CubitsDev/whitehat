const Bag = require('./bag');

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
})
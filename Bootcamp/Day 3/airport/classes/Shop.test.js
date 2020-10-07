const Shop = require('./Shop');
const Person = require('./Person');
const Item = require('./Item');

describe('Shop Tests', () => {
    let shop = new Shop('Starbucks');
    test('Shop has a name', () => {
        expect(shop.name).toBe('Starbucks');
    })
    test('Shop can have staff', () => {
        let person1 = new Person('Craig', 'Staff');
        shop.addStaff(person1);
        expect(shop.staff.includes(person1)).toBeTruthy;
    })
    test('Shop can have items', () => {
        let item1 = new Item('Coffee', 1.5);
        shop.addItem(item1);
        expect(shop.items.includes(item1)).toBeTruthy;
    })
})
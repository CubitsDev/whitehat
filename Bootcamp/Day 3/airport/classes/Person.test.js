const Person = require('./Person');
const Bag = require('./Bag');

describe('Person Tests', () => {
    var person = new Person('Tom', 'Passenger');
    test('Person has a name', () => {
        expect(person.name).toBe('Tom');
    })
    test('Person has a Type', () => {
        expect(() => new Person()).toThrowError('Person must have a valid type')
    })
    test('Person is a Passenger', () => {
        expect(person.type).toBe('Passenger');
    })
    test('Person can Hold bags', () => {
        expect(Array.isArray(person.bags)).toBeTruthy();
    })
    test('Person can have a Job', () => {
        var staff = new Person('Steve', 'Staff');
        staff.setJob('Security');
        expect(staff.job).toBe('Security');
    })
    test('Person can be assigned a bag', () => {
        let bag = new Bag(10, 'blue');
        person.addBag(bag);
        expect(person.bags[0]).toBe(bag);
    })
})
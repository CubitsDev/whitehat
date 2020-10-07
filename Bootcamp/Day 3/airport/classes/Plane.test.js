const Plane = require('./Plane');
const Person = require('./Person');

describe('Plane Tests', () => {
    const plane = new Plane('A320', 200);
    test('Plane has valid type', () => {
        expect(() => new Plane('A320')).not.toThrowError('Plane must be valid type.')
    })
    test('Plane has 200 seats', () => {
        expect(plane.seats).toBe(200);
    })
    test('Plane can hold passengers', () => {
        expect(Array.isArray(plane.passengers)).toBeTruthy();
    })
    test('Plane can board passengers', () => {
        let passenger1 = new Person('Steve', 'Passenger');
        let passenger2 = new Person('Dave', 'Passenger');
        plane.boardMultiPassengers([passenger1, passenger2])
        expect(plane.passengers.length).toBe(2);
    })
    test('Plane can board single passenger', () => {
        let passenger1 = new Person('Steve', 'Passenger');
        plane.boardSinglePassenger(passenger1);
        expect(plane.passengers[2]).toBe(passenger1);
    })
})
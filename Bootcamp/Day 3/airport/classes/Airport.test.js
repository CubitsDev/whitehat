const Airport = require('./Airport');
const Plane = require('./Plane')
const Shop = require('./Shop');

describe('Airport Tests', () => {
    const airport = new Airport('Heathrow')
    test('Airport has a name', () => {
        expect(airport.name).toBe('Heathrow');
    });
    
    test('Airport can land a plane', () => {
        let plane1 = new Plane('A320', 20, airport);
        airport.landPlane(plane1);
        expect(airport.planes.includes(plane1)).toBeTruthy();
    })
    test('Airport can have shops', () => {
        let shop1 = new Shop('Coffee Hut')
        airport.addShop(shop1);
        expect(airport.shops.includes(shop1)).toBeTruthy();
    })
    test('Plane can fly between two airports', () => {
        let lhr = new Airport('LHR');
        let ltn = new Airport('LTN');
        let plane = new Plane('A320', 20, lhr);
        lhr.landPlane(plane);
        expect(lhr.planes.includes(plane)).toBeTruthy();
        lhr.takeOff(plane, ltn);
        expect(lhr.planes.includes(plane)).toBeFalsy();
        ltn.landPlane(plane);
        expect(ltn.planes.includes(plane)).toBeTruthy();
        expect(plane.destination).toBe(null);
        ltn.takeOff(plane, lhr);
        expect(plane.destination).toBe(lhr);
        expect(ltn.planes.includes(plane)).toBeFalsy();
        lhr.landPlane(plane);
        expect(lhr.planes.includes(plane)).toBeTruthy();
    })
})
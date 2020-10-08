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
    test('Plane cannot land at the wrong airport', () => {
        let lhr = new Airport('LHR');
        let ltn = new Airport('LTN');
        let plane = new Plane('A320', 20, lhr);
        expect(ltn.landPlane(plane)).toBe('Not my destination. Mine is: LHR');
    });
    test('Airport Auto Assigns its data (callback)', (done) => {
        let ltn = new Airport('ltn');
        ltn.populateData((complete) => {
            if (complete) done();
        })
    })
    test('Airport can retrieve data after population (callback)', (done) => {
        let ltn = new Airport('ltn');
        ltn.populateData((complete) => {
            if (complete) {
                expect(ltn.returnInfo('name')).toBe('London Luton Airport');
                expect(ltn.returnInfo('icao')).toBe('EGGW');
                expect(ltn.returnInfo('iata')).toBe('LTN');
                expect(ltn.returnInfo('city')).toBe('London');
                expect(ltn.returnInfo('state')).toBe('England');
                expect(ltn.returnInfo('country')).toBe('GB');
                expect(ltn.returnInfo('tz')).toBe('Europe/London');
                done();
            }
        })
    })
    test('Airport Auto Assigns its data and can return (promise)', () => {
        let ltn = new Airport('ltn');
        ltn.populateDataPromise()
        .then(res => {
            if (res) {
                expect(ltn.returnInfo('name')).toBe('London Luton Airport');
            }
        })
        .catch(err => {throw err});
    })

    test('Airport Auto Assigns its data and can return (promise)', async () => {
        let ltn = new Airport('ltn');
        let result = await ltn.populateDataAwait();
        console.log(result);
        expect(result).toBeTruthy();
        
    })
})
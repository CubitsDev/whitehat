var Scooter = require('./classes/Scooter');
var Charger = require('./classes/Charge');
var User = require('./classes/User');
describe('Scooter can charge', () => {
    test('Scooter Charges fully when at the docking station', async () => {
        let scoot = new Scooter();
        let charger = new Charger(20);
        charger.dock(scoot);
        return charger.charge(scoot)
        .then(result => {
            expect(result).toBeTruthy();
            console.log(scoot.charging);
            expect(scoot.charge).toBe(100);
        })
    })
})

describe('People can go and rent a scooter', () => {
    test('User cannot take a charging scooter or uncharged one', () => {
        let scoot = new Scooter();
        let station = new Charger(5);
        let person = new User('Steve', 20)
        station.dock(scoot);
        expect(person.getScooter(station)).toBeFalsy();
    })
    test('User can take and be assigned a charged scooter', () => {
        let scoot = new Scooter();
        let person = new User('Steve', 20)
        let station = new Charger(5);
        station.dock(scoot);
        return station.charge(scoot)
        .then(result => {
            person.getScooter(station)
            expect(person.currentScooter).toBe(scoot);
        })
    })
})

describe('People can return a Scooter', () => {
    test('User can return a Scooter to any Station', () => {
        let person = new User('Steve', 15);
        let charger = new Charger(2);
        let scooter = new Scooter();
        charger.dock(scooter);
        return charger.charge(scooter)
        .then(res => {
            person.getScooter(charger);
            person.returnScooter(charger);
            expect(charger.occupants.includes(scooter)).toBeTruthy();
        })

    })
    test('User cannot return a Scooter to a full station', () => {
        let person = new User('Steve', 15);
        let charger = new Charger(1);
        let scooter = new Scooter();
        let scooter2 = new Scooter();
        charger.dock(scooter);
        console.log(charger.occupants)
        return charger.charge(scooter)
        .then(res => {
            person.getScooter(charger);
            charger.dock(scooter2);
            expect(person.returnScooter(charger)).toBeFalsy();
        })
    })
})
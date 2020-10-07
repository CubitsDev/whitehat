var fs = require('fs');
// Import all our classes
const Airport = require('./classes/Airport');
const Bag = require('./classes/Bag');
const Item = require('./classes/Item');
const Person = require('./classes/Person');
const Plane = require('./classes/Plane');
const Shop = require('./classes/Shop');



// Create all Items, Shops, People, Planes, Bags and the Airport

var ShopItem1 = new Item('Coffee', 1.5);
var ShopItem2 = new Item('Sandwich', 1.2);
var ShopItem3 = new Item('Tea', 0.99);
var ShopItem4 = new Item('Laptop', 299);
var ShopItem5 = new Item('Headphones', 34.99);
var ShopItem6 = new Item('Chocolate', 2.50);

var Bag1 = new Bag(8, 'red');
var Bag2 = new Bag(12, 'black');
var Bag3 = new Bag(9, 'white');
var Bag4 = new Bag(15, 'purple');

var Person1 = new Person('Steve', 'Passenger');
var Person2 = new Person('Sam', 'Passenger');
var Person3 = new Person('Gemma', 'Passenger');
var Person4 = new Person('Tom', 'Staff');
var Person5 = new Person('Lucy', 'Staff');
var Person6 = new Person('Dave', 'Staff');
var Person7 = new Person('Anne', 'Staff');

var Shop1 = new Shop('Starbucks');


var Shop2 = new Shop('Duty Free');

var Heathrow = new Airport('Heathrow');

var Plane1 = new Plane('A320', 50, Heathrow);
var Plane2 = new Plane('Boeing 747', 70, Heathrow);

// Run all tests linking everything

describe("Add People's Stuff", () => {
    test('Add Bags to Passengers', () => {
        Person1.addBag(Bag1);
        Person2.addBag(Bag2);
        Person2.addBag(Bag3);
        Person3.addBag(Bag4);
        expect(Person1.bags.includes(Bag1)).toBeTruthy;
        expect(Person2.bags.includes(Bag2)).toBeTruthy;
        expect(Person2.bags.includes(Bag3)).toBeTruthy;
        expect(Person3.bags.includes(Bag4)).toBeTruthy;
    })
    test('Add Jobs to People', () => {
        Person4.setJob('Shop');
        Person5.setJob('Shop');
        Person6.setJob('Security');
        Person7.setJob('Airline Staff');
        expect(Person4.job).toBe('Shop');
        expect(Person5.job).toBe('Shop');
        expect(Person6.job).toBe('Security');
        expect(Person7.job).toBe('Airline Staff');
    })
})

describe("Setup Shops", () => {
    test('Setup Shop1', () => {
        Shop1.addStaff(Person4);
        Shop1.addItem(ShopItem1);
        Shop1.addItem(ShopItem2);
        Shop1.addItem(ShopItem3);
        expect(Shop1.staff.includes(Person4)).toBeTruthy();
        expect(Shop1.items.includes(ShopItem1)).toBeTruthy();
        expect(Shop1.items.includes(ShopItem2)).toBeTruthy();
        expect(Shop1.items.includes(ShopItem3)).toBeTruthy();
    })
    test('Setup Shop2', () => {
        Shop2.addStaff(Person5);
        Shop2.addItem(ShopItem4);
        Shop2.addItem(ShopItem5);
        Shop2.addItem(ShopItem6);
        expect(Shop2.staff.includes(Person5)).toBeTruthy();
        expect(Shop2.items.includes(ShopItem4)).toBeTruthy();
        expect(Shop2.items.includes(ShopItem5)).toBeTruthy();
        expect(Shop2.items.includes(ShopItem6)).toBeTruthy();
    })
})


describe('Build Airport', () => {
    test('Add Shops', () => {
        Heathrow.addShop(Shop1);
        Heathrow.addShop(Shop2);
        expect(Heathrow.shops.includes(Shop1)).toBeTruthy();
        expect(Heathrow.shops.includes(Shop2)).toBeTruthy();
    });
    test('Land Both Planes', () => {
        Plane1.destination = Heathrow;
        Plane2.destination = Heathrow;
        Heathrow.landPlane(Plane1);
        Heathrow.landPlane(Plane2);
        expect(Heathrow.planes.includes(Plane1)).toBeTruthy()
        expect(Heathrow.planes.includes(Plane2)).toBeTruthy();
    });
})

describe('Board Plane1', () => {
    test('Board Passengers', () => {
        Plane1.boardMultiPassengers([Person1, Person2]);
        expect(Plane1.passengers.includes(Person1)).toBeTruthy();
        expect(Plane1.passengers.includes(Person2)).toBeTruthy();
    });
})

describe('Board Plane2', () => {
    test('Board Passenger', () => {
        Plane2.boardSinglePassenger(Person3);
        expect(Plane2.passengers.includes(Person3)).toBeTruthy();
    });
})

//Log all the Airport

//Provided Tests Pass this is how the airport var would look:

Person1.addBag(Bag1);
Person2.addBag(Bag2);
Person2.addBag(Bag3);
Person3.addBag(Bag4);
Person4.setJob('Shop');
Person5.setJob('Shop');
Person6.setJob('Security');
Person7.setJob('Airline Staff');
Shop1.addStaff(Person4);
Shop1.addItem(ShopItem1);
Shop1.addItem(ShopItem2);
Shop1.addItem(ShopItem3);
Shop2.addStaff(Person5);
Shop2.addItem(ShopItem4);
Shop2.addItem(ShopItem5);
Shop2.addItem(ShopItem6);
Heathrow.addShop(Shop1);
Heathrow.addShop(Shop2);
Heathrow.landPlane(Plane1);
Heathrow.landPlane(Plane2);
Plane1.boardMultiPassengers([Person1, Person2]);
Plane2.boardSinglePassenger(Person3);


fs.writeFile("airport_output.json", JSON.stringify(Heathrow, null, "\t"), function(err) {
    if (err) {
        console.log(err);
    }
});

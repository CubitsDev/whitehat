const db = require("./db");
const { aloader, rloader } = require('./index');
const {Restaurant} = require('./Restaurant');
const Menu = require('./Menu');
const {Item} = require('./Item');
const dbTest = require('./dbTest');

describe('Database setup (Airports)', () => {
    test('Create Table', () => {
        db.run('CREATE TABLE IF NOT EXISTS airports(id INTEGER PRIMARY KEY, icao TEXT, iata TEXT, name TEXT, city TEXT, state TEXT, country TEXT, elevation INTEGER, lat FLOAT, lon FLOAT, tz TEXT);', function (error) {
            if (error) {
                console.error(error);
            }
        })
    });
    test('Load tables', done => {
        aloader(() => {
            db.get('SELECT COUNT(id) AS total FROM airports;', function (err, row) {
                expect(row.total).toBe(28868)
                done();
            })
        })
    }, 30000)
})

describe('Database setup (Restaurants)', () => {
    test('Create Table', () => {
        db.run('CREATE TABLE IF NOT EXISTS restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT);', function (error) {
            if (error) {
                console.error(error);
            }
        })
        db.run('CREATE TABLE IF NOT EXISTS menus(id INTEGER PRIMARY KEY, name TEXT, restaurant_id INTEGER);', function (error) {
            if (error) {
                console.error(error);
            }
        })
        db.run('CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY, name TEXT, price INTEGER, menu_id INTEGER);', function (error) {
            if (error) {
                console.error(error);
            }
        })
    });
    test('Load tables', (done) => {
        rloader(() => {
            db.get('SELECT COUNT(name) AS total FROM restaurants;', function (err, row) {
                expect(row.total).toBe(8);
                done();
            })
        })
    })
})

describe('Tests for ORM Restaurant (Stored in memory db)', () => {
    beforeAll((done) => {
        dbTest.run('CREATE TABLE IF NOT EXISTS restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT);')
        dbTest.run('CREATE TABLE IF NOT EXISTS menus(id INTEGER PRIMARY KEY, name TEXT);');
        dbTest.run('CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY, name TEXT, price INTEGER);', done)
    });
    test('When a Restaurant is created it is stored in the database', async (done) => {
        const restaurant = await new Restaurant({name: 'Boo Jangles', image: 'https://some.image.url'})
        expect(restaurant.id).toBe(1)
        dbTest.get('SELECT * FROM restaurants WHERE id=?;', 1, (err, row) => {
            expect(row.name).toBe('Boo Jangles')
            done()
        })
    })
    test('can create an instance of an restaurant from a row', (done) => {
        dbTest.get('SELECT * FROM restaurants WHERE id=?', 1, async (err, row) => {
            const restaurant = await new Restaurant(row)
            expect(restaurant.id).toBe(1)
            expect(restaurant.name).toBe('Boo Jangles')
            dbTest.get('SELECT COUNT(id) AS total FROM restaurants;', (err, count) => {
                expect(count.total).toBe(1)
                done()
            })
        })        
    })
    test('When a Menu is created it is stored in the database', async (done) => {
        const menu = await new Menu({name: 'Lunch Menu'})
        expect(menu.id).toBe(1)
        dbTest.get('SELECT * FROM menus WHERE id=?;', 1, (err, row) => {
            expect(row.name).toBe('Lunch Menu')
            done()
        })
    })
    test('can create an instance of a menu from a row', (done) => {
        dbTest.get('SELECT * FROM menus WHERE id=?', 1, async (err, row) => {
            const menu = await new Menu(row)
            expect(menu.id).toBe(1)
            expect(menu.name).toBe('Lunch Menu')
            dbTest.get('SELECT COUNT(id) AS total FROM menus;', (err, count) => {
                expect(count.total).toBe(1)
                done()
            })
        })        
    })
    test('When an Item is created it is stored in the database', async (done) => {
        const item = await new Item({name: 'Chips', price: 2})
        expect(item.id).toBe(1)
        dbTest.get('SELECT * FROM items WHERE id=?;', 1, (err, row) => {
            expect(row.name).toBe('Chips')
            done()
        })
    })
    test('can create an instance of an item from a row', (done) => {
        dbTest.get('SELECT * FROM items WHERE id=?', 1, async (err, row) => {
            const item = await new Item(row)
            expect(item.id).toBe(1)
            expect(item.name).toBe('Chips')
            dbTest.get('SELECT COUNT(id) AS total FROM items;', (err, count) => {
                expect(count.total).toBe(1)
                done()
            })
        })        
    })

    test('Menu can have items linked and made automatically', async (done) => {
        let mn = await new Menu({name: 'Lunch Menu'});
        mn.addMenuItem('Chips', 2)
        .then(() => {
            expect(mn.items[0].price).toBe(2);
            done();
        })
    })

    test('Restaurant can have menus made and automatically linked', async (done) => {
        let rs = await new Restaurant({name: 'Test', image: 'image.url'});
        rs.addMenu('Lunch Menu', [{name: 'Chips', price: 2}, {name: 'Fires', price: 3.5}])
        .then(() => {
            expect(rs.menus[0].items[0].name).toBe('Chips');
            done();
        })
    })
})
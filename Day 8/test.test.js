const db = require("./db");
const { aloader, rloader } = require('./index');

describe('Database setup (Airports)', () => {
    test('Create Table', () => {
        db.run('CREATE TABLE IF NOT EXISTS airports(id INTEGER PRIMARY KEY, icao TEXT, iata TEXT, name TEXT, city TEXT, state TEXT, country TEXT, elevation INTEGER, lat FLOAT, lon FLOAT, tz TEXT);', function (error) {
            if (error) {
                console.error(error);
            }
        })
    });
    test('Load tables', (done) => {
        aloader(() => {
            db.get('SELECT COUNT(id) AS total FROM airports;', function (err, row) {
                expect(row.total).toBe(28867)
                done();
            })
        })
    })
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
                expect(row.total).toBe(7);
                done();
            })
        })
    })
})
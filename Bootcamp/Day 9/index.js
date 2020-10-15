const airports = require('./airports.json');
const restaurants = require('./restaurants.json');
const db = require('./db');

function ainsert(airports, callback) {
    if (airports.length === 0) return callback();
    const airport = airports.pop();
    const values = Object.values(airport)
    db.run('INSERT INTO airports (icao, iata, name, city, state, country, elevation, lat, lon, tz) VALUES (?,?,?,?,?,?,?,?,?,?);', values, function(err) {
        ainsert(airports, callback)
    })
}

function aloader(callback) {
    db.run('PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;', function(err) {
        if(err) return console.error(err);
        db.run('DELETE FROM airports;', function (err) {
            if (err) console.error(err);
            ainsert(airports, callback);
        })
    })
}

function rinsert(restaurants, callback) {
    if (restaurants.length === 0) return callback();
    const restaurant = restaurants.pop();
    db.run('INSERT INTO restaurants (name, image) VALUES (?,?);', [restaurant.name.toString(), restaurant.image.toString()], function(err) {
        // console.log(restaurant.menus);
        rinsertmenu(restaurant.menus, this.lastID, function () {
            rinsert(restaurants, callback)
        })
    })
}

function rinsertmenu(menus, restaurant, cb) {
    if (menus.length === 0) return cb();
    const menu = menus.pop();
    db.run('INSERT INTO menus (name, restaurant_id) VALUES (?, ?);', [menu.title, restaurant], function(err) {
        // console.log(this.lastID)
        rinsertItem(menu.items, this.lastID, () => {
            rinsertmenu(menus, restaurant, cb);
        })
    })
}

function rinsertItem(items, menu, cb) {
    if (items.length === 0) return cb();
    const item = items.pop();
    db.run('INSERT INTO items (name, price, menu_id) VALUES (?, ?, ?);', [item.name, item.price, menu], function(err) {
        rinsertItem(items, menu, cb)
    })
}

function rloader(callback) {
    db.run('DELETE FROM restaurants; DELETE FROM menus; DELETE FROM items;', function(err) {
        if (err) console.error(err);
        rinsert(restaurants, callback);
    })
}

module.exports = {aloader, rloader};
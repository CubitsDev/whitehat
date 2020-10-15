const db = require("./dbTest")
const Menu = require('./Menu');
class Restaurant {
    static findAll = () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM restaurants;', async function (err, rows) {
                if (err) return reject(err)
                const restaurants = await Promise.all(rows.map(row => new Restaurant(row)))
                resolve(restaurants)
            })
        })
    }
    constructor(data) {
        const restaurant = this
        restaurant.id = data.id
        restaurant.name = data.name
        restaurant.image = data.image,
        restaurant.menus = [];
        if (data.id) {
            return Promise.resolve(restaurant)
        } else {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO restaurants(name, image) VALUES(?,?);', [restaurant.name, restaurant.image], function (err) {
                    restaurant.id = this.lastID
                    resolve(restaurant)
                })
            })
        }
    }

    async addMenu(mName, arrOfItems) {
        const mn = await new Menu({name: mName});
        for (let i = 0; i < arrOfItems.length; i++) {
            await mn.addMenuItem(arrOfItems[i].name, arrOfItems[i].price);
            if (i === arrOfItems.length - 1) {
                this.menus.push(mn);
            }
        }
    }

}
module.exports = { Restaurant }
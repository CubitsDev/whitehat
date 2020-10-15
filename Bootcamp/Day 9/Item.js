const db = require("./dbTest")
class Item {
    static findAll = () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM items;', async function (err, rows) {
                if (err) return reject(err)
                const items = await Promise.all(rows.map(row => new Item(row)))
                resolve(items)
            })
        })
    }
    constructor(data) {
        const item = this
        item.id = data.id
        item.name = data.name
        item.price = data.price
        if (data.id) {
            return Promise.resolve(item)
        } else {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO items(name, price) VALUES(?,?);', [item.name, item.price], function (err) {
                    item.id = this.lastID
                    resolve(item)
                })
            })
        }
    }
}
module.exports = { Item }
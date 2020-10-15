const db = require("./dbTest")
const {Item} = require('./Item');
class Menu {
    static findAll = () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM menus;', async function (err, rows) {
                if (err) return reject(err)
                const menus = await Promise.all(rows.map(row => new Menu(row)))
                resolve(menus)
            })
        })
    }
    constructor(data) {
        const menu = this
        menu.id = data.id
        menu.name = data.name,
        menu.items = []
        if (data.id) {
            return Promise.resolve(menu)
        } else {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO menus(name) VALUES(?);', [menu.name], function (err) {
                    menu.id = this.lastID
                    resolve(menu)
                })
            })
        }
    }

    async addMenuItem(iName, iPrice) {
        const item = await new Item({name: iName, price: iPrice});
        this.items.push(item);
    }

}
module.exports = Menu 
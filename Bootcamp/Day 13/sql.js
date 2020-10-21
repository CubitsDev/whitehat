const { Restaurant, Menu, Item, sequelize } = require('./model')
const data = require('./restaurants.json')

module.exports = async function sql() {
    sequelize.sync().then(async () => {
        const taskQueue = data.map(async (json_restaurant) => {
                const restaurant = await Restaurant.create({name: json_restaurant.name, image: json_restaurant.image})
                const menus = await Promise.all(json_restaurant.menus.map(async (_menu) => {
                    const items = await Promise.all(_menu.items.map(({name, price}) => Item.create({name, price})))
                    const menu = await Menu.create({name: _menu.name})
                    return menu.setItems(items)
                }))
                return await restaurant.setMenus(menus)
            })
        await Promise.all(taskQueue).then(restaurants => {
            // console.log(JSON.stringify(restaurants, null, 2))
        }).catch(console.error)
    })
}

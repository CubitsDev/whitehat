const {Restaurant, Menu, Item, sequelize} = require('./models');
const data = require('./restaurants.json');

describe('Restaurant Tests', () => {
    
beforeAll(async () => {
    await sequelize.sync().then(async () => {
        const taskQueue = data.map(async (json_restaurant) => {
                const restaurant = await Restaurant.create({name: json_restaurant.name, image: json_restaurant.image})
                const menus = await Promise.all(json_restaurant.menus.map(async (_menu) => {
                    const items = await Promise.all(_menu.items.map(({name, price}) => Item.create({name, price})))
                    const menu = await Menu.create({title: _menu.title})
                    return menu.setItems(items)
                }))
                return await restaurant.setMenus(menus)
            })
        return Promise.all(taskQueue)
    })
})

    test('can create a restaurant', async () => {
        const rs = await Restaurant.create({name: 'Bobs', image: 'url'});
        expect(rs.id).toBe(9);
    })
    test('can find a pre-existing restaurant', async () => {
        const restaurants = await Restaurant.findAll({
            where: {
                name: 'Bobs'
            }
        });
        // console.log(JSON.stringify(restaurants))
        expect(restaurants[0].name).toBe('Bobs');
    });
    test('can create a menu', async () => {
        const mn = await Menu.create({name: 'Lunch Menu'});
        expect(mn.id).toBe(19);
    })
    test('can find a pre-existing menu', async () => {
        const menus = await Menu.findAll({
            where: {
                name: 'Lunch Menu'
            }
        });
        expect(menus[0].name).toBe('Lunch Menu');
    });
    test('can create an item', async () => {
        const it = await Item.create({name: 'Chips', price: 2.50});
        expect(it.id).toBe(85);
    })
    test('can find a pre-existing item', async () => {
        const items = await Item.findAll({
            where: {
                name: 'Chips'
            }
        });
        expect(items[0].price).toBe(2.50);
    });

    test('restaurants have menus and items', async () => {
        const restaurant = await Restaurant.create({name: 'Ronalds', image: 'http://some.image.url'})
        const menu = await Menu.create({name: 'menu 1'})
        await restaurant.addMenu(menu)
        const menus = await restaurant.getMenus()
        const item = await Item.create({name: 'Chips', price: 2.50});
        await menus[0].addItem(item);
        const items = await menus[0].getItems();
        expect(menus[0].name).toBe('menu 1')
        expect(items[0].name).toBe('Chips')
    })
    test('Pull restaurant, menu and item from db', async () => {
        const rest = await Restaurant.findOne({where: {name: "Cafe Monico"}, include: [{all: true, nested: true}]});
        expect(rest.menus[0].items[0].name).toBe('Chicken Liver Parfait')
    })
})
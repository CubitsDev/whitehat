const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const { Restaurant, Menu, Item, sequelize } = require('./model')
const sql = require('./sql');
const app = express()

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
})


app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
    })
    const chosen = restaurants[Math.floor(Math.random() * restaurants.length)]
    res.render('home', {chosen});
})

app.get('/directory', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
    })
    //res.send(restaurants);
    res.render('directory', {restaurants});
})

app.get('/directory/:id', async (req, res) => {
    const chosen = await Restaurant.findByPk(req.params.id)
    const chosenMenus = await chosen.getMenus({
        include: [{model: Item, as: 'items'}],
        nest: true
    })
    res.render('restaurant', {chosen, chosenMenus});
})

app.post('/restaurants/new', async (req, res) => {
    const rest = await Restaurant.create(req.body);
    res.redirect('/directory')
})

app.get('/admin', (req, res) => {
    res.render('admin');
})

app.get('/admin/all', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
    })
    res.send(restaurants);
})

app.get('/admin/select/:id', async (req,res) => {
    const chosen = await Restaurant.findByPk(req.params.id)
    res.send(chosen);
})

app.post('/admin/update/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update(req.body)
    res.send(true)
})

app.get('/admin/delete/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    restaurant.destroy();
    res.redirect('/admin');
})

app.post('/admin/menus/create', async (req, res) => {
    const rest = await Restaurant.findByPk(req.body.resId);
    const menu = await Menu.create({name: req.body.name});
    await rest.addMenu(menu);
    res.send(true);
});

app.get('/admin/menus/all/:id', async (req, res) => {
    const rest = await Restaurant.findByPk(req.params.id);
    const chosenMenus = await rest.getMenus({
        include: [{model: Item, as: 'items'}],
        nest: true
    })
    res.send(chosenMenus);
})

app.post('/admin/items/create', async (req, res) => {
    const rest = await Restaurant.findByPk(req.body.resID);
    const chosenMenu = await rest.getMenus({
        where: {id: req.body.menID},
        include: [{model: Item, as: 'items'}],
        nest: true
    })
    const item = await Item.create({name: req.body.name, price: req.body.price});
    chosenMenu[0].addItem(item);
    res.redirect('/admin')
})

app.get('/admin/items/all/:id', async (req, res) => {
    const rest = await Restaurant.findByPk(req.params.id);
    const menus = await rest.getMenus({
        include: [{model: Item, as: 'items'}],
        nest: true
    })
    var allItems = []
    for (let i = 0; i < menus.length; i++) {
        for (let x = 0; x < menus[i].items.length; x++) {
            allItems.push(menus[i].items[x])
        }
    }
    res.send(allItems);
})

app.get('/admin/items/info/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    res.send(item);
})

app.post('/admin/items/update', async (req, res) => {
    // const rest = await Restaurant.findByPk(req,body.resID);
    // const menus = await rest.getMenus({
    //     include: [{model: Item, as: 'items'}],
    //     nest: true
    // })
    const item = await Item.findByPk(req.body.iID);
    item.update({name: req.body.iName, price: req.body.iPrice});
    res.send(true)
})

app.post('/admin/items/delete', async (req, res) => {
    const item = await Item.findByPk(req.body.iID);
    item.destroy();
    res.send(true);
})

app.post('/admin/menus/update', async (req, res) => {
    // const rest = await Restaurant.findByPk(req,body.resID);
    // const menus = await rest.getMenus({
    //     include: [{model: Item, as: 'items'}],
    //     nest: true
    // })
    const menu = await Menu.findByPk(req.body.mID);
    menu.update({name: req.body.mName});
    res.send(true)
})

app.post('/admin/menus/delete', async (req, res) => {
    const menu = await Menu.findByPk(req.body.mID);
    menu.destroy();
    res.send(true);
})

app.listen(3000, () => {
    // sql();
    console.log('web server running on port 3000')
})

const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const sql = require('./sql');
const { Restaurant, Menu, Item, sequelize } = require('./model')
const app = express()

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
})


app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

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

sql();
app.listen(3000, () => console.log('web server running on port 3000'))

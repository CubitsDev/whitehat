const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const storeObj = require('./store.json');
const app = express();
const port = 3000;

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', (req, res) => {
    var featured = storeObj[Math.floor(Math.random() * storeObj.length)]
    res.render('home', {featured});
})

app.get('/store', (req, res) => {
    res.render('store', {storeObj});
})

app.get('/store/:id', (req, res) => {
    var product = storeObj.find(element => element.id == req.params.id);
    var link = req.originalUrl;
    res.render('product', {product, link})
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.listen(port, () => {
    console.log(`web server is running on ${port}`);
})
var Restaurant = require('./classes/Restaurant');
var Menu = require('./classes/Menu');
var Item = require('./classes/Item');
var Review = require('./classes/Review');

describe('Restaurant Class Tests', () => {
    test('Restaurant has a name', () => {
        let rest = new Restaurant('Test Restaurant')
        expect(rest.name).toBe('Test Restaurant');
    });
    test('Restaurant can add a menu', () => {
        let rest = new Restaurant('Test Restaurant');
        let menu = new Menu('Food');
        rest.addMenu(menu);
        expect(rest.menus.includes(menu)).toBeTruthy();
    })
    test('Restaurant can remove a menu', () => {
        let rest = new Restaurant('Test Restaurant');
        let menu = new Menu('Food');
        rest.addMenu(menu);
        expect(rest.menus.includes(menu)).toBeTruthy();
        rest.removeMenu(menu);
        expect(rest.menus.includes(menu)).toBeFalsy();
    })
    test('Restaurant can have a review', () => {
        let review1 = new Review(3, 'This place was horrible decor but nice food');
        let rest = new Restaurant('Test Restaurant');
        rest.addReview(review1);
        expect(rest.reviews.includes(review1)).toBeTruthy();
    })
    test('Restaurant can remove a review', () => {
        let review1 = new Review(3, 'This place was horrible decor but nice food');
        let rest = new Restaurant('Test Restaurant');
        rest.addReview(review1);
        expect(rest.reviews.includes(review1)).toBeTruthy();
        rest.removeReview(review1);
        expect(rest.reviews.includes(review1)).toBeFalsy();
    })
    test('Restaurants can calculate an average review score', () => {
        let review1 = new Review(2, 'Test');
        let review2 = new Review(3, 'Test');
        let review3 = new Review(2, 'Test');
        let review4 = new Review(5, 'Test');
        let rest = new Restaurant('Test Restaurant');
        rest.addReview(review1);
        rest.addReview(review2);
        rest.addReview(review3);
        rest.addReview(review4);
        expect(rest.averageReview()).toBe(3);
    })
    test('Create PDF of restaurant', () => {
        let rest = new Restaurant('Example Restaurant');
        let menu1 = new Menu('Lunch Menu');
        let menu2 = new Menu('Breakfast');
        let menu3 = new Menu('Desserts');
        let item1 = new Item('Fries', 2.0, 'Potato Goodness');
        let item2 = new Item('Chips', 3.0, 'Potato Goodness');
        let item3 = new Item('Small Breakfast', 8.0, 'Good start to the day');
        let item4 = new Item('Breakfast Baguette', 9.0, 'Baguette to start the day');
        let item5 = new Item('Brownie', 4.0, 'Made In house');
        let item6 = new Item('Cheesecake', 3.0, 'Best around');
        let review1 = new Review(2, 'Nice Place');
        let review2 = new Review(3, 'Test Review');
        let review3 = new Review(2, 'Bad Food');
        let review4 = new Review(5, 'Nice food nice place.');
        rest.addReview(review1);
        rest.addReview(review2);
        rest.addReview(review3);
        rest.addReview(review4);
        menu1.addItem(item1);
        menu1.addItem(item2);
        menu2.addItem(item3);
        menu2.addItem(item4);
        menu3.addItem(item5);
        menu3.addItem(item6);
        rest.addMenu(menu1);
        rest.addMenu(menu2);
        rest.addMenu(menu3);
        rest.makePDFDoc('example');
    })
})

describe('Menu Class Tests', () => {
    test('Menu has a name', () => {
        let menu1 = new Menu('Starters');
        expect(menu1.name).toBe('Starters');
    });
    test('Menu can add Item', () => {
        let menu1 = new Menu('Sides');
        let item1 = new Item('Fries', 2.0, 'Classic Side');
        menu1.addItem(item1);
        expect(menu1.items.includes(item1)).toBeTruthy();
    })
    test('Menu can remove item', () => {
        let menu1 = new Menu('Sides');
        let item1 = new Item('Fries', 2.0, 'Classic Side');
        menu1.addItem(item1);
        expect(menu1.items.includes(item1)).toBeTruthy();
        menu1.removeItem(item1);
        expect(menu1.items.includes(item1)).toBeFalsy();
    })
})

describe('Item Class Tests', () => {
    test('Item has a name', () => {
        let item1 = new Item('Fries', 2.0, 'Potato Goodness');
        expect(item1.name).toBe('Fries');
    })
    test('Item has a price', () => {
        let item1 = new Item('Fries', 2.0, 'Potato Goodness');
        expect(item1.price).toBe(2.0);
    })
    test('Item has a description', () => {
        let item1 = new Item('Fries', 2.0, 'Potato Goodness');
        expect(item1.description).toBe('Potato Goodness');
    })
})

describe('Review Class Tests', () => {
    test('Review has a rating of 1-5', () => {
        let review1 = new Review(3, 'This place was horrible decor but nice food');
        expect(review1.rating).toBe(3);
    })
    test('Review has a description', () => {
        let review1 = new Review(3, 'This place was horrible decor but nice food');
        expect(review1.description).toBe('This place was horrible decor but nice food');
    })
})
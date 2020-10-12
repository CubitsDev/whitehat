const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
module.exports = class Restaurant {
    constructor(name) {
        this.name = name;
        this.menus = [];
        this.reviews = [];
    }

    addMenu(menu) {
        this.menus.push(menu);
    }

    removeMenu(menu) {
        this.menus.splice(this.menus.indexOf(menu), 1);
    }

    addReview(rev) {
        this.reviews.push(rev)
    }

    removeReview(rev) {
        this.reviews.splice(this.reviews.indexOf(rev), 1);
    }

    averageReview() {
        var total = 0;
        var amnt = 0;
        this.reviews.forEach(element => {
            total = total + element.rating;
            amnt++;
        });
        return total / amnt;
    }

    makePDFDoc(docname) {
        const doc = new PDFDocument;
        doc.pipe(fs.createWriteStream('./'+ docname +'.pdf'))

        doc.font('./Fragmentcore.otf')
        .fontSize(25)
        .text(this.name + ' - Information PDF', 200, 100);

        doc.font('./Fragmentcore.otf')
        .fontSize(12)
        .text('Average Review: ' + this.averageReview() + ' Stars', 100, 200);

        doc.font('./Fragmentcore.otf')
        .fontSize(12)
        .text('Amount of Menus: ' + this.menus.length, 100, 300);

        this.menus.forEach(element => {
            doc.addPage()
            .fontSize(25)
            .text(element.name, 200, 100);
            let i = 200;
            element.items.forEach(e => {
                doc.fontSize(12)
                .text(e.name + ' £' + e.price + '  - ' + e.description, 100, i);
                i = i + 50;
            });
        });

        doc.addPage()
        .fontSize(25)
        .text('Reviews:', 200, 100);

        let y = 200;

        this.reviews.forEach(element => {
            doc.fontSize(12)
            .text(element.rating + ' Star Review: ' + element.description, 100, y);
            y = y + 100;
        });
        doc.end();
    }
}
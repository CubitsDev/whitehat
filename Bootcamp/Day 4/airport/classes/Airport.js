class Airport {
    static airports = [];

    constructor(name) {
        this.name = name;
        this.planes = [];
        this.shops = [];
        this.constructor.airports.push(this.name);
    }

    landPlane(planeObj) {
        if (planeObj.destination != this) {
            return 'Not my destination. Mine is: ' + planeObj.destination.name;
        } else {
            planeObj.destination = null;
            this.planes.push(planeObj);
        }
    }

    addShop(shopObj) {
        this.shops.push(shopObj);
    }

    takeOff(plane, destination) {
        let temp = this.planes.indexOf(plane);
        this.planes.splice(temp, 1);
        plane.destination = destination;
    }
}

module.exports = Airport;
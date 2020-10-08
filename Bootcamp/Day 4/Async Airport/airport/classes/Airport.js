const fs = require('fs');
const path = require('path');
class Airport {
    static airports = [];

    constructor(name) {
        this.name = name;
        this.planes = [];
        this.shops = [];
        this.constructor.airports.push(this.name);
        this.airportData;
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

    populateData(callback) {
        fs.readFile(path.resolve(__dirname, '../airports.json'), (err, data) => {
            if (err) throw err;
            var fullList = JSON.parse(data);
            var ourAirport = fullList.find(obj => obj.iata == this.name.toUpperCase());
            // console.log(ourAirport);
            this.airportData = ourAirport;
            callback(true);
        })
    }

    populateDataPromise() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../airports.json'), (err, data) => {
                if (err) reject();
                var fullList = JSON.parse(data);
                var ourAirport = fullList.find(obj => obj.iata == this.name.toUpperCase());
                // console.log(ourAirport);
                this.airportData = ourAirport;
                resolve(true);
            })
        })
    }

    async populateDataAwait() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../airports.json'), (err, data) => {
                if (err) reject();
                var fullList = JSON.parse(data);
                var ourAirport = fullList.find(obj => obj.iata == this.name.toUpperCase());
                // console.log(ourAirport);
                this.airportData = ourAirport;
                resolve(true);
            })
        })
    }

    

    returnInfo(input) {
        switch (input) {
            case 'icao':
                return this.airportData.icao;
                break;
            case 'iata':
                return this.airportData.iata;
                break;
            case 'name':
                return this.airportData.name;
                break;
            case 'city':
                return this.airportData.city;
                break;
            case 'state':
                return this.airportData.state;
                break;
            case 'country':
                return this.airportData.country;
                break;
            case 'tz':
                return this.airportData.tz;
                break;
            default:
                return 'Error'
                break;
        }
    }
}

module.exports = Airport;
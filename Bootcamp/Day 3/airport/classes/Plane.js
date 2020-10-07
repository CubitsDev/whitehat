const {planeTypes} = require('../allTypes');

class Plane {
    constructor(type, seats, dest) {
        if (planeTypes.includes(type)) {
            this.type = type;
        } else {
            throw new Error('Plane must be valid type.');
        }
        this.seats = seats;
        this.seatsRemaining = seats;
        this.passengers = [];
        this.destination = dest;
    }
    boardMultiPassengers(arr) {
        arr.forEach(element => {
            if (this.seatsRemaining == 0) {
                console.log('Plane is full!')
            } else {
                this.passengers.push(element);
                this.seatsRemaining = this.seatsRemaining - 1;
            }
        });
    }

    boardSinglePassenger(passenger) {
        this.passengers.push(passenger);
        this.seatsRemaining = this.seatsRemaining - 1;
    }
}

module.exports = Plane;
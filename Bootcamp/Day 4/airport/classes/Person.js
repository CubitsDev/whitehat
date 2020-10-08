const {personTypes, jobTypes} = require('../allTypes');
class Person {
    constructor(name, type, job) {
        this.name = name;
        if (!personTypes.includes(type)) {
            throw new Error('Person must have a valid type')
        }
        this.type = type;
        this.bags = [];
        this.job = job;
    }


    addBag(bag) {
        this.bags.push(bag);
    }
}

class Passenger extends Person {
    constructor(name, type) {
        super(name, type);
    }

    callAttendant() {
        return 'Can I have a drink please!';
    }
}

class AirCrew extends Person {
    constructor(name, type) {
        var job = "Airline Staff";
        super(name, type, job);
    }

}

class Staff extends Person {
    constructor(name, type, ) {
        super(name, type);
    }

    setJob(job) {
        this.job = job;
    }
}


module.exports = {Person, Passenger, AirCrew, Staff};
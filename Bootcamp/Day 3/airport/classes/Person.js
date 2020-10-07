const {personTypes, jobTypes} = require('../allTypes');
class Person {
    constructor(name, type) {
        this.name = name;
        if (!personTypes.includes(type)) {
            throw new Error('Person must have a valid type')
        }
        this.type = type;
        this.bags = [];
        this.job = "";
    }

    setJob(job) {
        if (this.type == 'Staff') {
            if (jobTypes.includes(job)) {
                this.job = job;
            }
        } else {
            throw new Error('Person is wrong type')
        }
    }

    addBag(bag) {
        this.bags.push(bag);
    }
}

module.exports = Person;
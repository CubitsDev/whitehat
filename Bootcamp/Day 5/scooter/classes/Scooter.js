class Scooter {
    constructor() {
        this.charge = 0;
        this.charging = false;
        this.asignee;
        this.station;
    }

    chargeScooter() {
        return new Promise((resolve, reject) => {
            this.charge = this.charge +1;
            // console.log(this.charge);
            this.charging = true;
            resolve();
        })
        
    }
}

module.exports = Scooter;
class Charger {
    constructor(spaces) {
        this.spaces = spaces;
        this.occupants = [];
        this.startCharge;
    }

    dock(scooter){
        if (this.spaces == 0) {
            return 'Full';
        } else {
            scooter.asignee = null;
            scooter.station = this;
            this.spaces = this.spaces -1;
            this.occupants.push(scooter);
            return 'Docked';
        }
    }

    charge(scooter) {
        if (this.occupants.includes(scooter)) {
            return new Promise((resolve, reject) => {
                var startCharge = setInterval(() => {
                    if (scooter.charge == 100) {
                        console.log('Scooter Charged')
                        clearInterval(startCharge);
                        scooter.charging = false;
                        resolve(true);
                    } else {
                        this.chargeScooter(scooter)
                    }
                }, 20)
            })
        } else {
            console.log('Scooter is not docked.')
            return 'Scooter must be docked to charge';
        }
           
    }
    
    chargeScooter(scooter) {
        scooter.chargeScooter().then((res) => {
            
        })
    }
}

module.exports = Charger;
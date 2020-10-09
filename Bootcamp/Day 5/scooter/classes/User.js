class User {
    constructor(name, money) {
        this.name = name;
        this.money = money;
        this.currentScooter;
    }

    getScooter(station) {
        var foundScooter = false
        var i = 0;
        while (!foundScooter) {
            if (station.occupants[i].charge == 100) {
                foundScooter = true;
            } else {
                i++;
                if (station.occupants[i] == null) {
                    console.log('Scooter has no charge');
                return false;
                }
            }
        }
        var scooter = station.occupants[i];

            scooter.asignee = this;
            scooter.station = null;
            station.occupants.splice(i, 1);
            station.spaces = station.spaces +1;
            this.money = this.money - 2;
            this.currentScooter = scooter;
    }

    returnScooter(station) {
        if (station.spaces == 0) {
            return false
        } else {
            this.currentScooter.charge = 0;
            station.dock(this.currentScooter);
            this.currentScooter = null;
            return true;
        }
    }
}
module.exports = User;
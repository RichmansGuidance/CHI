// Базовий клас
class Transport {
    constructor(type) {
        this.type = type;
    }

    ride() {
        console.log(`${this.type} is riding.`);
    }

    stop() {
        console.log(`${this.type} has stopped.`);
    }
}

// Підклас
class Car extends Transport {
    constructor() {
        super('Car');
    }

    honk() {
        console.log('Car honks:');
    }
}

class Bike extends Transport {
    constructor() {
        super('Bike');
    }

    ringBell() {
        console.log('Bike rings bell:');
    }
}

// Фабрика
class TransportFactory {
    static createTransport(type) {
        const transportMap = {
            car: Car,
            bike: Bike,
        };

        // Валідація типу
        if (!transportMap[type]) {
            throw new Error(`Transport type "${type}" is not supported.`);
        }

        const TransportClass = transportMap[type];
        return new TransportClass();
    }
}


const myCar = TransportFactory.createTransport('car');
myCar.ride();
myCar.honk();
myCar.stop();

const myBike = TransportFactory.createTransport('bike');
myBike.ride();
myBike.ringBell();
myBike.stop();

const wrongType = TransportFactory.createTransport('Fighter');
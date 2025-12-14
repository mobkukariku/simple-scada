export class SensorManager {
    constructor() {
        this.sensors = [];
    }

    addSensor(sensor) {
        this.sensors.push(sensor);
    }

    removeSensor(id){
        this.sensors = this.sensors.filter(sensor => sensor.id !== id);
    }

    updateSensorValue(id, newVal) {
        const sensor = this.getSensorById(id);
        if (sensor) sensor.updateValue(newVal);
    }

    getSensorById(id) {
        return this.sensors.find(sensor => sensor.id === id);
    }

    getAllSensors() {
        return this.sensors;
    }

    getSensorsByStatus(status) {
        if (status === 'all') return this.getAllSensors();

        return this.sensors.filter(sensor => sensor.status === status);
    }
}
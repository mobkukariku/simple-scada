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
        this.sensors = this.sensors.map(sensor => sensor.id === id ? {...sensor, value: newVal} : sensor);
    }

    getSensorById(id) {
        return this.sensors.find(sensor => sensor.id === id);
    }

    getAllSensors() {
        return this.sensors;
    }

    getSensorsByStatus(status) {
        return this.sensors.filter(sensor => sensor.status === status);
    }
}
export class DashboardUI {
    constructor(sensorManager, container) {
        this.manager = sensorManager;
        this.container = document.querySelector(container);
    }

    render(){

    }

    renderSensor(sensor){
    }

    updateSensorCard(sensorId, newVal){
        const sensor = this.manager.getSensorById(sensorId);
        sensor.updateValue(newVal);
    }
}
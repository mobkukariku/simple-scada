import { SensorManager } from "./src/core/SensorManager.js";
import { DashboardUI } from "./src/ui/DashboardUI.js";
import { SensorType } from "./src/types/sensor.js";
import { Sensor } from "./src/core/Sensor.js";
import {clearError, showError} from "./src/ui/formErrors.js";

const manager = new SensorManager();
const ui = new DashboardUI(manager, '#sensors-grid');

document.getElementById('add-sensor-form').addEventListener('submit', (e) => {
    e.preventDefault();
    try{
        clearError();

        const name = document.getElementById('sensor-name').value;
        const type = document.getElementById('sensor-type').value;
        const val = Number(document.getElementById('sensor-val').value);
        const min = Number(document.getElementById('sensor-min').value);
        const max = Number(document.getElementById('sensor-max').value);

        const id = Date.now();

        manager.addSensor(new Sensor(id, name, type, val, min, max));
        ui.render();

        e.target.reset();
    }catch (error){
        showError(error);
    }
});


document.getElementById('filters').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        e.target.classList.add('active');

        const filter = e.target.dataset.filter;
        ui.setFilter(filter);
    }
});

document.getElementById('clear-btn');


//initial mock data
manager.addSensor(new Sensor(1, "Котел Основной", SensorType.TEMPERATURE, 22.5, 18, 25));
manager.addSensor(new Sensor(2, "Насос Подачи", SensorType.PRESSURE, 5.2, 1.5, 4.5));
manager.addSensor(new Sensor(3, "Бак Воды", SensorType.LEVEL, 85, 20, 80));

ui.render();

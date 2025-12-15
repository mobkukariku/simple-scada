import {SensorRules, SensorStatus, SensorStatusLabel, SensorTypeLabel} from "../types/sensor.js";

export class DashboardUI {
    constructor(sensorManager, container) {
        this.manager = sensorManager;
        this.container = document.querySelector(container);
        this.currentFilter = 'all';
    }

    render(){
        this.container.innerHTML = '';

        const sensors = this.manager.getSensorsByStatus(this.currentFilter);

        if (sensors.length === 0) {
            this.container.innerHTML = '<p class="not-found" >Нет датчиков</p>';
        }

        sensors.forEach(sensor => {
            const cardElement = this.renderSensor(sensor);
            this.container.appendChild(cardElement);
        })

        this.updateStats();
    }

    renderSensor(sensor){
        const article = document.createElement('article');

        article.className = `sensor-card status-${sensor.status}`;

        article.innerHTML = `
            <header class="card-header">
                <div>
                    <h3>${sensor.name}</h3>
                    <span class="sensor-type">${SensorTypeLabel[sensor.type]}</span>
                </div>
                <button class="btn-close" aria-label="Удалить">×</button>
            </header>
            
            <div class="card-value" style="color:${sensor.getStatusColor()}">
                ${sensor.value} ${SensorRules[sensor.type].unit}
            </div>
            
            <div class="card-status-label status-${sensor.status}">
                 ${sensor.status === SensorStatus.NORMAL ? '✔' :
                sensor.status === SensorStatus.WARNING ? '⚠' : '✖'}
                ${SensorStatusLabel[sensor.status]}
            </div>

            <div class="card-actions">
                <input type="number" class="val-input" placeholder="Новое знач.">
                <button class="btn-refresh" aria-label="Обновить">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide icon lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                </button>
            </div>
            
            <footer class="card-footer">
                Обновлено: ${sensor.lastUpdate.toLocaleString()}
            </footer>
        `;

        const deleteBtn = article.querySelector('.btn-close');
        deleteBtn.addEventListener('click', () => {
            this.manager.removeSensor(sensor.id);
            this.render();
        });

        const refreshBtn = article.querySelector('.btn-refresh');
        const input = article.querySelector('.val-input');

        refreshBtn.addEventListener('click', () => {
            if (input.value !== '') {
                this.updateSensorCard(sensor.id, input.value);
            }
        });

        return article;
    }

    updateSensorCard(sensorId, newVal){
        this.manager.updateSensorValue(sensorId, newVal);
        this.render();
    }

    setFilter(filter){
        this.currentFilter = filter;
        this.render();
    }

    updateStats() {
        const stats = this.manager.getStats();

        const elNormal = document.getElementById('count-normal');
        const elWarning = document.getElementById('count-warning');
        const elCritical = document.getElementById('count-critical');

        if (elNormal) elNormal.textContent = stats[SensorStatus.NORMAL];
        if (elWarning) elWarning.textContent = stats[SensorStatus.WARNING];
        if (elCritical) elCritical.textContent = stats[SensorStatus.CRITICAL];
    }
}
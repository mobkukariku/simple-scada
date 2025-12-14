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
                ${SensorStatusLabel[sensor.status]}
            </div>

            <div class="card-actions">
                <input type="number" class="val-input" placeholder="Новое знач.">
                <button class="btn-refresh">Обновить</button>
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
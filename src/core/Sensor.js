import {SensorColor, SensorRules, SensorStatus} from "../types/sensor.js";


export class Sensor {
    constructor(id, name, type, value, minValue, maxValue) {

        if (minValue >= maxValue) {
            throw new Error('Минимальный пороговый уровень должен быть меньше максимального порогового значения.');
        }

        this.id = id;
        this.name = name;
        this.type = type;
        this.value = value;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.status = SensorStatus.NORMAL;
        this.lastUpdate = new Date();
    }

    updateValue(newVal) {
        this.value = newVal;
        this.lastUpdate = new Date();
        this.checkThreshold();
    }

    checkThreshold() {
        const rules = SensorRules[this.type];
        if (!rules) return;

        const { minValue, maxValue, value } = this;

        const warningMin = minValue + (maxValue - minValue) * rules.warning.minOffset;
        const warningMax = maxValue - (maxValue - minValue) * rules.warning.maxOffset;

        if (value < minValue || value > maxValue) {
            this.status = SensorStatus.CRITICAL;
        } else if (value < warningMin || value > warningMax) {
            this.status = SensorStatus.WARNING;
        } else {
            this.status = SensorStatus.NORMAL;
        }
    }


    getStatusColor() {
        switch (this.status){
            case SensorStatus.NORMAL: return SensorColor.GREEN;
            case SensorStatus.WARNING: return SensorColor.ORANGE;
            case SensorStatus.CRITICAL: return SensorColor.RED;
        }
    }
}


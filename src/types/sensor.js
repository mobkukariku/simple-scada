export const SensorType = Object.freeze({
    TEMPERATURE: 'temperature',
    PRESSURE: 'pressure',
    LEVEL: 'level'
});

export const SensorRules = {
    temperature: {
        warning: { minOffset: 0.2, maxOffset: 0.2 },
        unit: '°C'

    },
    pressure: {
        warning: { minOffset: 1.0, maxOffset: 0.5 },
        unit: 'bar'
    },
    level: {
        warning: { minOffset: 0.1, maxOffset: 0.1 },
        unit: '%'
    }
};


export const SensorStatus = Object.freeze({
    NORMAL: 'normal',
    WARNING: 'warning',
    CRITICAL: 'critical'
})

export const SensorColor = Object.freeze({
    GREEN: '#2ecc71',
    ORANGE: '#f1c40f',
    RED: '#e74c3c'
})

export const SensorTypeLabel = {
    [SensorType.TEMPERATURE]: 'Температура',
    [SensorType.PRESSURE]: 'Давление',
    [SensorType.LEVEL]: 'Уровень'
};

export const SensorStatusLabel = {
    [SensorStatus.NORMAL]: 'Норма',
    [SensorStatus.WARNING]: 'Предупреждение',
    [SensorStatus.CRITICAL]: 'Критично'
};

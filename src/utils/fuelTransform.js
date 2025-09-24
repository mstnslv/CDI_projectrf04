const fuelTransformMap = {
    1: 'Бензин',
    2: 'Дизель',
    3: 'Газ',
    4: 'Гибрид',
    5: 'Электро',
}
export function fuelTransform(id) {
    return fuelTransformMap[id] ?? '';
}
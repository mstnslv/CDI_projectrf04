const transmissionMap = {
    1: 'Автомат',
    2: 'Механика',
    3: 'Робот',
    4: 'Вариатор',
}
export function transmissionTransform(id) {
    return transmissionMap[id] ?? '';
}
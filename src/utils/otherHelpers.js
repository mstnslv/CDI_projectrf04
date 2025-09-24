export const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") ?? '';
};

export const toQueryObject = (query) => {
    let res = {};
    for (const key in query) {
        if (Array.isArray(query[key])) {
            res[key] = query[key].join(',');
        } else {
            res[key] = query[key];
        }
    }
    return res;
}

export const fromQueryObject = (query) => {
    let res = {};
    for (const key in query) {
        if(key === 'fuelType' || key==='transmission' || key==='availability') {
            if(query[key]) {
                if(query[key].indexOf(',')>-1){
                    res[key] = query[key].split(',').map((item) => Number(item));
                } else {
                    res[key] = [Number(query[key])];
                }
            } else {
                res[key] = null;
            }
            continue;
        }
        if (query[key] && query[key].includes(',')) {
            res[key] = query[key].split(',');
        } else {
            let num = Number.parseInt(query[key]);
            if(!Number.isNaN(num)) {
                res[key] = num;
                continue;
            }
            res[key] = query[key] ?? null;
        }
    }
    return res;
}

export const fromStringToQueryObject = (query) => {
    let res = {};
    let queryArr = query.split('&');
    for (const item of queryArr) {
        let [key, value] = item.split('=');
        if (value && value.includes(',')) {
            res[key] = value.split(',');
        } else {
            let num = Number.parseInt(value);
            if (!Number.isNaN(num)) {
                res[key] = num;
                continue;
            }
            res[key] = value ?? null;
        }
    }
    return res;
}

export const isMobile = () => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}

export function formatDateTimeToDMYHM(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}
export function formatDateTimeToDMY(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}.${month}.${year}`;
}

export function formatDateTimeToHM(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

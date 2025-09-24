function splitEvery(str, n) {
    return str.match(new RegExp('.{1,' + n + '}', 'g'));
}
function splitHash(hash, splitSize, splitDepth) {
    if (typeof hash !== 'string' || typeof splitSize !== 'number' || typeof splitDepth !== 'number' || splitSize <= 0 || splitDepth <= 0) {
        // Обработка некорректных аргументов
        return '';
    }

    const totalLength = hash.length + (splitDepth - 1) * splitSize;
    if (totalLength <= splitSize) {
        return hash; // Весь хеш умещается в одну часть
    }

    // Корректируем splitDepth, чтобы уместить хеш в указанное число частей
    if (totalLength < splitSize * splitDepth) {
        splitDepth = Math.ceil(totalLength / splitSize);
    }

    const parts = [];
    const hashLength = hash.length;
    for (let i = 0; i < splitDepth; i++) {
        const startIndex = i * splitSize;
        const endIndex = Math.min((i + 1) * splitSize, hashLength);
        parts.push(hash.substring(startIndex, endIndex));
    }
    return parts.join('/');
}
export function getPhotoUrl(name,main_photo_name, folder = 'static') {
    try {
        if(main_photo_name){
            let id = main_photo_name.split('_')[0];
            //return `https://media.mdmcar.com/${folder}/${splitHash(id,2,4)}/${id+'_'+name}`;
            return `https://media.cardataimport.com/${folder}/${splitHash(id,2,4)}/${id+'_'+name}`;
        }
        let id = name.split('_')[0];
        //let arr = splitEvery(id, 4);
        //return `https://media.mdmcar.com/${folder}/${splitHash(id,2,4)}/${name}`; //185.216.26.72
        return `https://media.cardataimport.com/${folder}/${splitHash(id,2,4)}/${name}`; //185.216.26.72
        //return `http://localhost:3330/${folder}/${splitHash(id,2,4)}/${name}`; //185.216.26.72
        //return `https://media.mdmcar.com/static/${arr.join('/')}/${name}`; //185.216.26.72
        //return `http://185.216.26.72:3330/static/${arr.join('/')}/${name}`; //185.216.26.72

    } catch (e) {
        return '';
    }
}
function isObject(value) {
    return typeof value === 'object' && value !== 'null';
}

/**
 * @param {Any} source
 */
function deepClone(source) {
    if (!isObject(source)) return source;

    const target = Array.isArray(source) ? [] : {};
    for ( let key in source) { // eslint-disable-line
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = deepClone(source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

export default {
    isObject,
    deepClone,
};

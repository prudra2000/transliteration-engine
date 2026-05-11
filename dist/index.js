import { getScheme } from './schemes/index.js';
import { toRoman as _toRoman } from './engine/toRoman.js';
import { toGujarati as _toGujarati } from './engine/toGujarati.js';
export { iso15919, ungegn, ascii, getScheme } from './schemes/index.js';
export function transliterate(text, options = {}) {
    const { scheme = 'iso15919', direction = 'toRoman', capitalize = false } = options;
    const schemeMap = getScheme(scheme);
    return direction === 'toRoman'
        ? _toRoman(text, schemeMap, { capitalize })
        : _toGujarati(text, schemeMap);
}
export function toRoman(text, scheme = 'iso15919', options = {}) {
    return _toRoman(text, getScheme(scheme), options);
}
export function toGujarati(text, scheme = 'iso15919') {
    return _toGujarati(text, getScheme(scheme));
}
//# sourceMappingURL=index.js.map
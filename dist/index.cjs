"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheme = exports.ascii = exports.ungegn = exports.iso15919 = void 0;
exports.transliterate = transliterate;
exports.toRoman = toRoman;
exports.toGujarati = toGujarati;
const index_js_1 = require("./schemes/index.js");
const toRoman_js_1 = require("./engine/toRoman.js");
const toGujarati_js_1 = require("./engine/toGujarati.js");
var index_js_2 = require("./schemes/index.js");
Object.defineProperty(exports, "iso15919", { enumerable: true, get: function () { return index_js_2.iso15919; } });
Object.defineProperty(exports, "ungegn", { enumerable: true, get: function () { return index_js_2.ungegn; } });
Object.defineProperty(exports, "ascii", { enumerable: true, get: function () { return index_js_2.ascii; } });
Object.defineProperty(exports, "getScheme", { enumerable: true, get: function () { return index_js_2.getScheme; } });
function transliterate(text, options = {}) {
    const { scheme = 'iso15919', direction = 'toRoman', capitalize = false } = options;
    const schemeMap = (0, index_js_1.getScheme)(scheme);
    return direction === 'toRoman'
        ? (0, toRoman_js_1.toRoman)(text, schemeMap, { capitalize })
        : (0, toGujarati_js_1.toGujarati)(text, schemeMap);
}
function toRoman(text, scheme = 'iso15919', options = {}) {
    return (0, toRoman_js_1.toRoman)(text, (0, index_js_1.getScheme)(scheme), options);
}
function toGujarati(text, scheme = 'iso15919') {
    return (0, toGujarati_js_1.toGujarati)(text, (0, index_js_1.getScheme)(scheme));
}
//# sourceMappingURL=index.js.map
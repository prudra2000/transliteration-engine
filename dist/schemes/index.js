export { iso15919 } from './iso15919.js';
export { ungegn } from './ungegn.js';
export { ascii } from './ascii.js';
import { iso15919 } from './iso15919.js';
import { ungegn } from './ungegn.js';
import { ascii } from './ascii.js';
const SCHEMES = { iso15919, ungegn, ascii };
export function getScheme(name) {
    return SCHEMES[name];
}
//# sourceMappingURL=index.js.map
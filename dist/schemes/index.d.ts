export { iso15919 } from './iso15919.js';
export { ungegn } from './ungegn.js';
export { ascii } from './ascii.js';
export type { SchemeMap, VowelPair } from './types.js';
import type { SchemeMap } from './types.js';
export type SchemeName = 'iso15919' | 'ungegn' | 'ascii';
export declare function getScheme(name: SchemeName): SchemeMap;
//# sourceMappingURL=index.d.ts.map
import { type SchemeName } from './schemes/index.js';
import { type ToRomanOptions } from './engine/toRoman.js';
export type { SchemeName } from './schemes/index.js';
export type { SchemeMap, VowelPair } from './schemes/types.js';
export { iso15919, ungegn, ascii, getScheme } from './schemes/index.js';
export type { ToRomanOptions } from './engine/toRoman.js';
export interface TransliterateOptions {
    scheme?: SchemeName;
    direction?: 'toRoman' | 'toGujarati';
    capitalize?: boolean;
}
export declare function transliterate(text: string, options?: TransliterateOptions): string;
export declare function toRoman(text: string, scheme?: SchemeName, options?: ToRomanOptions): string;
export declare function toGujarati(text: string, scheme?: SchemeName): string;
//# sourceMappingURL=index.d.ts.map
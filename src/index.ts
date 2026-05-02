import { getScheme, type SchemeName } from './schemes/index.js'
import { toRoman as _toRoman, type ToRomanOptions } from './engine/toRoman.js'
import { toGujarati as _toGujarati } from './engine/toGujarati.js'

export type { SchemeName } from './schemes/index.js'
export type { SchemeMap, VowelPair } from './schemes/types.js'
export { iso15919, ungegn, ascii, getScheme } from './schemes/index.js'
export type { ToRomanOptions } from './engine/toRoman.js'

export interface TransliterateOptions {
  scheme?: SchemeName
  direction?: 'toRoman' | 'toGujarati'
  capitalize?: boolean
}

export function transliterate(
  text: string,
  options: TransliterateOptions = {},
): string {
  const { scheme = 'iso15919', direction = 'toRoman', capitalize = false } = options
  const schemeMap = getScheme(scheme)
  return direction === 'toRoman'
    ? _toRoman(text, schemeMap, { capitalize })
    : _toGujarati(text, schemeMap)
}

export function toRoman(
  text: string,
  scheme: SchemeName = 'iso15919',
  options: ToRomanOptions = {},
): string {
  return _toRoman(text, getScheme(scheme), options)
}

export function toGujarati(
  text: string,
  scheme: SchemeName = 'iso15919',
): string {
  return _toGujarati(text, getScheme(scheme))
}

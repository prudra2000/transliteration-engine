export { iso15919 } from './iso15919.js'
export { ungegn } from './ungegn.js'
export { ascii } from './ascii.js'
export type { SchemeMap, VowelPair } from './types.js'

import { iso15919 } from './iso15919.js'
import { ungegn } from './ungegn.js'
import { ascii } from './ascii.js'
import type { SchemeMap } from './types.js'

export type SchemeName = 'iso15919' | 'ungegn' | 'ascii'

const SCHEMES: Record<SchemeName, SchemeMap> = { iso15919, ungegn, ascii }

export function getScheme(name: SchemeName): SchemeMap {
  return SCHEMES[name]
}

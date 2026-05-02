export const HALANT = '્'
export const ANUSVARA = 'ં'
export const CANDRABINDU = 'ઁ'
export const VISARGA = 'ઃ'
export const NUKTA = '઼'
export const AVAGRAHA = 'ઽ'
export const DANDA = '।'

// Inherent vowel codepoint (અ)
export const INHERENT_VOWEL_CP = 'અ'

// Gujarati Unicode codepoints for quick membership checks
const CONSONANT_CPS = new Set([
  0x0A95, // ક ka
  0x0A96, // ખ kha
  0x0A97, // ગ ga
  0x0A98, // ઘ gha
  0x0A99, // ઙ ṅa
  0x0A9A, // ચ ca
  0x0A9B, // છ cha
  0x0A9C, // જ ja
  0x0A9D, // ઝ jha
  0x0A9E, // ઞ ña
  0x0A9F, // ટ ṭa
  0x0AA0, // ઠ ṭha
  0x0AA1, // ડ ḍa
  0x0AA2, // ઢ ḍha
  0x0AA3, // ણ ṇa
  0x0AA4, // ત ta
  0x0AA5, // થ tha
  0x0AA6, // દ da
  0x0AA7, // ધ dha
  0x0AA8, // ન na
  0x0AAA, // પ pa
  0x0AAB, // ફ pha/fa
  0x0AAC, // બ ba
  0x0AAD, // ભ bha
  0x0AAE, // મ ma
  0x0AAF, // ય ya
  0x0AB0, // ર ra
  0x0AB2, // લ la
  0x0AB3, // ળ ḷa
  0x0AB5, // વ va
  0x0AB6, // શ śa/sha
  0x0AB7, // ષ ṣa/ṣha
  0x0AB8, // સ sa
  0x0AB9, // હ ha
])

const INDEPENDENT_VOWEL_CPS = new Set([
  0x0A85, // અ a
  0x0A86, // આ ā
  0x0A87, // ઇ i
  0x0A88, // ઈ ī
  0x0A89, // ઉ u
  0x0A8A, // ઊ ū
  0x0A8B, // ઋ r̥/ṛ
  0x0A8C, // ઌ l̥ (rare)
  0x0A8D, // ઍ short e (ê)
  0x0A8F, // એ e
  0x0A90, // ઐ ai
  0x0A91, // ઑ short o (ô)
  0x0A93, // ઓ o
  0x0A94, // ઔ au
])

const MATRA_CPS = new Set([
  0x0ABE, // ◌ া ā
  0x0ABF, // ◌ ি i
  0x0AC0, // ◌ ী ī
  0x0AC1, // ◌ ু u
  0x0AC2, // ◌ ূ ū
  0x0AC3, // ◌ ৃ r̥/ṛ
  0x0AC4, // ◌ ৄ r̥̄ (rare)
  0x0AC5, // ◌ short e matra (ê)
  0x0AC7, // ◌ ে e
  0x0AC8, // ◌ ৈ ai
  0x0AC9, // ◌ short o matra (ô)
  0x0ACB, // ◌ ো o
  0x0ACC, // ◌ ৌ au
])

const POST_DIACRITIC_CPS = new Set([
  0x0A82, // anusvara
  0x0A81, // candrabindu
  0x0A83, // visarga
])

const NUMERAL_CPS_START = 0x0AE6
const NUMERAL_CPS_END = 0x0AEF

export function isConsonant(ch: string): boolean {
  return CONSONANT_CPS.has(ch.codePointAt(0)!)
}

export function isIndependentVowel(ch: string): boolean {
  return INDEPENDENT_VOWEL_CPS.has(ch.codePointAt(0)!)
}

export function isMatra(ch: string): boolean {
  return MATRA_CPS.has(ch.codePointAt(0)!)
}

export function isPostDiacritic(ch: string): boolean {
  return POST_DIACRITIC_CPS.has(ch.codePointAt(0)!)
}

export function isNumeral(ch: string): boolean {
  const cp = ch.codePointAt(0)!
  return cp >= NUMERAL_CPS_START && cp <= NUMERAL_CPS_END
}

export function numeralToDigit(ch: string): string {
  return String(ch.codePointAt(0)! - NUMERAL_CPS_START)
}

export function digitToNumeral(digit: string): string {
  return String.fromCodePoint(parseInt(digit, 10) + NUMERAL_CPS_START)
}

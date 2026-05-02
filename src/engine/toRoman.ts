import type { SchemeMap } from '../schemes/types.js'
import {
  HALANT,
  DANDA,
  isConsonant,
  isMatra,
  isIndependentVowel,
  isPostDiacritic,
  isNumeral,
  numeralToDigit,
} from '../unicode.js'

export function toRoman(text: string, scheme: SchemeMap): string {
  // Spread into an array of Unicode scalar values (handles any surrogates safely)
  const chars = [...text]
  const out: string[] = []
  let i = 0

  while (i < chars.length) {
    const ch = chars[i]

    if (isConsonant(ch)) {
      // Emit the consonant romanization (no inherent vowel yet)
      out.push(scheme.consonants[ch] ?? ch)
      i++

      // A halant immediately after a consonant suppresses its inherent vowel.
      // The next character decides what follows:
      //   - another consonant → conjunct (continue loop, no vowel emitted)
      //   - anything else     → halanta (end of consonant cluster, no vowel)
      if (i < chars.length && chars[i] === HALANT) {
        i++ // consume halant
        continue // back to top; if next char is a consonant we skip its vowel too
      }

      // Check for an explicit vowel sign (matra)
      if (i < chars.length && isMatra(chars[i])) {
        out.push(scheme.matras[chars[i]] ?? chars[i])
        i++
      } else if (!isPostDiacritic(chars[i] ?? '')) {
        // No matra and the next char is not a diacritic → emit inherent vowel
        out.push(scheme.inherentVowel)
      } else {
        // Next char is anusvara/visarga etc. — still need inherent vowel first
        out.push(scheme.inherentVowel)
      }

      // Post-syllable diacritics (anusvara, candrabindu, visarga)
      while (i < chars.length && isPostDiacritic(chars[i])) {
        out.push(scheme.diacritics[chars[i]] ?? chars[i])
        i++
      }
    } else if (isIndependentVowel(ch)) {
      out.push(scheme.vowels[ch] ?? ch)
      i++
      while (i < chars.length && isPostDiacritic(chars[i])) {
        out.push(scheme.diacritics[chars[i]] ?? chars[i])
        i++
      }
    } else if (isNumeral(ch)) {
      out.push(numeralToDigit(ch))
      i++
    } else if (ch === DANDA) {
      out.push('.')
      i++
    } else {
      // Pass-through: Latin letters, spaces, punctuation, etc.
      out.push(ch)
      i++
    }
  }

  return out.join('')
}

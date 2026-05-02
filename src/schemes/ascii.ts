import type { SchemeMap } from './types.js'

// ASCII simplified scheme: no diacritics, fully keyboard-typeable.
// Retroflex series uses capital letters (T, Th, D, Dh, N, Sh, L) to
// remain unambiguous and allow greedy longest-match reverse parsing.
// Long vowels double the base letter (aa, ii, uu).
// Anusvara → M, Visarga → H (capitals avoid collision with consonants m/h).

export const ascii: SchemeMap = {
  name: 'ascii',

  inherentVowel: 'a',

  vowelPairs: [
    { independent: 'અ', matra: null },
    { independent: 'આ', matra: 'ા' },
    { independent: 'ઇ', matra: 'િ' },
    { independent: 'ઈ', matra: 'ી' },
    { independent: 'ઉ', matra: 'ુ' },
    { independent: 'ઊ', matra: 'ૂ' },
    { independent: 'ઋ', matra: 'ૃ' },
    { independent: 'ઍ', matra: 'ૅ' },
    { independent: 'એ', matra: 'ે' },
    { independent: 'ઐ', matra: 'ૈ' },
    { independent: 'ઑ', matra: 'ૉ' },
    { independent: 'ઓ', matra: 'ો' },
    { independent: 'ઔ', matra: 'ૌ' },
  ],

  vowels: {
    'અ': 'a',
    'આ': 'aa',
    'ઇ': 'i',
    'ઈ': 'ii',
    'ઉ': 'u',
    'ઊ': 'uu',
    'ઋ': 'ru',
    'ઍ': 'ae',
    'એ': 'e',
    'ઐ': 'ai',
    'ઑ': 'ao',
    'ઓ': 'o',
    'ઔ': 'au',
  },

  matras: {
    'ા': 'aa',
    'િ': 'i',
    'ી': 'ii',
    'ુ': 'u',
    'ૂ': 'uu',
    'ૃ': 'ru',
    'ૅ': 'ae',
    'ે': 'e',
    'ૈ': 'ai',
    'ૉ': 'ao',
    'ો': 'o',
    'ૌ': 'au',
  },

  diacritics: {
    'ં': 'M',
    'ઁ': '~m',
    'ઃ': 'H',
  },

  consonants: {
    'ક': 'k',
    'ખ': 'kh',
    'ગ': 'g',
    'ઘ': 'gh',
    'ઙ': 'ng',
    'ચ': 'ch',
    'છ': 'chh',
    'જ': 'j',
    'ઝ': 'jh',
    'ઞ': 'ny',
    'ટ': 'T',
    'ઠ': 'Th',
    'ડ': 'D',
    'ઢ': 'Dh',
    'ણ': 'N',
    'ત': 't',
    'થ': 'th',
    'દ': 'd',
    'ધ': 'dh',
    'ન': 'n',
    'પ': 'p',
    'ફ': 'ph',
    'બ': 'b',
    'ભ': 'bh',
    'મ': 'm',
    'ય': 'y',
    'ર': 'r',
    'લ': 'l',
    'ળ': 'L',
    'વ': 'v',
    'શ': 'sh',
    'ષ': 'Sh',
    'સ': 's',
    'હ': 'h',
  },
}

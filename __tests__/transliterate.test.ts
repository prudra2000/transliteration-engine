import { describe, it, expect } from 'vitest'
import { toRoman, toGujarati, transliterate } from '../src/index.js'

// ── Helpers ──────────────────────────────────────────────────────────────────

function roundTrip(gujarati: string, scheme: 'iso15919' | 'ungegn' | 'ascii') {
  const roman = toRoman(gujarati, scheme)
  const back = toGujarati(roman, scheme)
  return { roman, back }
}

// ── ISO 15919 ─────────────────────────────────────────────────────────────────

describe('ISO 15919 – toRoman', () => {
  it('simple vowels', () => {
    expect(toRoman('અ', 'iso15919')).toBe('a')
    expect(toRoman('આ', 'iso15919')).toBe('ā')
    expect(toRoman('ઇ', 'iso15919')).toBe('i')
    expect(toRoman('ઈ', 'iso15919')).toBe('ī')
    expect(toRoman('ઉ', 'iso15919')).toBe('u')
    expect(toRoman('ઊ', 'iso15919')).toBe('ū')
    expect(toRoman('એ', 'iso15919')).toBe('e')
    expect(toRoman('ઐ', 'iso15919')).toBe('ai')
    expect(toRoman('ઓ', 'iso15919')).toBe('o')
    expect(toRoman('ઔ', 'iso15919')).toBe('au')
  })

  it('consonants with inherent vowel', () => {
    expect(toRoman('ક', 'iso15919')).toBe('ka')
    expect(toRoman('ખ', 'iso15919')).toBe('kha')
    expect(toRoman('ગ', 'iso15919')).toBe('ga')
    expect(toRoman('ઘ', 'iso15919')).toBe('gha')
    expect(toRoman('ચ', 'iso15919')).toBe('ca')
    expect(toRoman('છ', 'iso15919')).toBe('cha')
    expect(toRoman('જ', 'iso15919')).toBe('ja')
    expect(toRoman('ટ', 'iso15919')).toBe('ṭa')
    expect(toRoman('ડ', 'iso15919')).toBe('ḍa')
    expect(toRoman('ણ', 'iso15919')).toBe('ṇa')
    expect(toRoman('ત', 'iso15919')).toBe('ta')
    expect(toRoman('દ', 'iso15919')).toBe('da')
    expect(toRoman('ન', 'iso15919')).toBe('na')
    expect(toRoman('પ', 'iso15919')).toBe('pa')
    expect(toRoman('ફ', 'iso15919')).toBe('pha')
    expect(toRoman('બ', 'iso15919')).toBe('ba')
    expect(toRoman('ભ', 'iso15919')).toBe('bha')
    expect(toRoman('મ', 'iso15919')).toBe('ma')
    expect(toRoman('ય', 'iso15919')).toBe('ya')
    expect(toRoman('ર', 'iso15919')).toBe('ra')
    expect(toRoman('લ', 'iso15919')).toBe('la')
    expect(toRoman('ળ', 'iso15919')).toBe('ḷa')
    expect(toRoman('વ', 'iso15919')).toBe('va')
    expect(toRoman('શ', 'iso15919')).toBe('śa')
    expect(toRoman('ષ', 'iso15919')).toBe('ṣa')
    expect(toRoman('સ', 'iso15919')).toBe('sa')
    expect(toRoman('હ', 'iso15919')).toBe('ha')
  })

  it('consonant + matra', () => {
    expect(toRoman('કા', 'iso15919')).toBe('kā')
    expect(toRoman('કિ', 'iso15919')).toBe('ki')
    expect(toRoman('કી', 'iso15919')).toBe('kī')
    expect(toRoman('કુ', 'iso15919')).toBe('ku')
    expect(toRoman('કૂ', 'iso15919')).toBe('kū')
    expect(toRoman('કે', 'iso15919')).toBe('ke')
    expect(toRoman('કૈ', 'iso15919')).toBe('kai')
    expect(toRoman('કો', 'iso15919')).toBe('ko')
    expect(toRoman('કૌ', 'iso15919')).toBe('kau')
  })

  it('anusvara and visarga', () => {
    expect(toRoman('કં', 'iso15919')).toBe('kaṁ')
    expect(toRoman('કઃ', 'iso15919')).toBe('kaḥ')
    expect(toRoman('કાં', 'iso15919')).toBe('kāṁ')
  })

  it('halant (conjunct)', () => {
    expect(toRoman('ક્ત', 'iso15919')).toBe('kta')
    expect(toRoman('ક્ષ', 'iso15919')).toBe('kṣa')
    expect(toRoman('ત્ર', 'iso15919')).toBe('tra')
    expect(toRoman('પ્ર', 'iso15919')).toBe('pra')
  })

  it('halanta – final voiceless consonant (one-way only)', () => {
    // ক্ → 'k' is correct; reverse 'k' → ক (ka) is the documented ambiguity
    expect(toRoman('ક્', 'iso15919')).toBe('k')
    expect(toRoman('ત્', 'iso15919')).toBe('t')
  })

  it('numerals', () => {
    expect(toRoman('૦૧૨૩૪૫૬૭૮૯', 'iso15919')).toBe('0123456789')
  })

  it('full words', () => {
    expect(toRoman('ગુજરાત', 'iso15919')).toBe('gujarāta')
    expect(toRoman('ભારત', 'iso15919')).toBe('bhārata')
    expect(toRoman('નમસ્તે', 'iso15919')).toBe('namaste')
    expect(toRoman('ધર્મ', 'iso15919')).toBe('dharma')
  })

  it('passes through non-Gujarati characters unchanged', () => {
    expect(toRoman('Hello ક', 'iso15919')).toBe('Hello ka')
    expect(toRoman('ક Hello', 'iso15919')).toBe('ka Hello')
  })
})

// ── UN/UNGEGN ────────────────────────────────────────────────────────────────

describe('UNGEGN – toRoman', () => {
  it('key consonant differences from ISO 15919', () => {
    expect(toRoman('ચ', 'ungegn')).toBe('cha')    // vs 'ca' in ISO
    expect(toRoman('છ', 'ungegn')).toBe('chha')   // vs 'cha' in ISO
    expect(toRoman('ફ', 'ungegn')).toBe('fa')     // vs 'pha' in ISO
    expect(toRoman('શ', 'ungegn')).toBe('sha')    // vs 'śa' in ISO
    expect(toRoman('ષ', 'ungegn')).toBe('ṣha')   // vs 'ṣa' in ISO
  })

  it('vocalic r', () => {
    expect(toRoman('ઋ', 'ungegn')).toBe('ṛ')      // vs 'r̥' in ISO
  })

  it('full words', () => {
    expect(toRoman('ગુજરાત', 'ungegn')).toBe('gujarāta')
    expect(toRoman('ભારત', 'ungegn')).toBe('bhārata')
  })
})

// ── ASCII simplified ──────────────────────────────────────────────────────────

describe('ASCII – toRoman', () => {
  it('long vowels doubled', () => {
    expect(toRoman('આ', 'ascii')).toBe('aa')
    expect(toRoman('ઈ', 'ascii')).toBe('ii')
    expect(toRoman('ઊ', 'ascii')).toBe('uu')
  })

  it('retroflex capitals', () => {
    expect(toRoman('ટ', 'ascii')).toBe('Ta')
    expect(toRoman('ઠ', 'ascii')).toBe('Tha')
    expect(toRoman('ડ', 'ascii')).toBe('Da')
    expect(toRoman('ઢ', 'ascii')).toBe('Dha')
    expect(toRoman('ણ', 'ascii')).toBe('Na')
    expect(toRoman('ળ', 'ascii')).toBe('La')
    expect(toRoman('ષ', 'ascii')).toBe('Sha')
  })

  it('palatal sibilant', () => {
    expect(toRoman('શ', 'ascii')).toBe('sha')
  })

  it('anusvara / visarga', () => {
    expect(toRoman('કં', 'ascii')).toBe('kaM')
    expect(toRoman('કઃ', 'ascii')).toBe('kaH')
  })

  it('full words', () => {
    expect(toRoman('ગુજરાત', 'ascii')).toBe('gujaraata')
    expect(toRoman('ભારત', 'ascii')).toBe('bhaarata')
  })
})

// ── Round-trip invariant ──────────────────────────────────────────────────────

describe('Round-trip: toGujarati(toRoman(x)) === x', () => {
  const words = [
    'ગ',           // single consonant
    'ગા',          // consonant + ā matra
    'ગુ',          // consonant + u matra
    'અ',           // independent vowel
    'આ',           // independent long ā
    'ઇ',           // independent i
    'ઈ',           // independent ī
    'ઉ',           // independent u
    'ઊ',           // independent ū
    'ક',           // ka
    'ક્ત',         // conjunct kta
    'ત્ર',         // conjunct tra
    'પ્ર',         // conjunct pra
    'ક્ષ',         // kṣa
    'ગ્ર',         // gra
    'ધ્ર',         // dhra
    // Note: halanta (ક્) is NOT round-trippable — all three schemes map the
    // voiceless final consonant to just its base roman (e.g. 'k'), which on
    // reverse is indistinguishable from the consonant with inherent 'a'.
    // This is a documented ambiguity in the UN UNGEGN report itself.
    'ગુજરાત',      // Gujarat
    'ભારત',        // Bharat
    'નમસ્તે',      // Namaste
    'ધર્મ',        // Dharma
    'સ્વ',         // sva
    'ત્ર',         // tra
    'ક્ષ',         // kṣa
    'જ્ઞ',         // jña
    'ભૂ',          // bhū
    'ભૂ',          // bhū (same)
    'કં',          // ka + anusvara
    'કઃ',          // ka + visarga
    'કાં',         // kā + anusvara
    'ભ',           // bha
    // OM (ૐ) is NOT round-trippable: ૐ → 'om' → ઓ+મ because 'om' is
    // indistinguishable from a normal o+m syllable sequence in reverse.
    '૧૨૩',         // numerals
  ]

  for (const scheme of ['iso15919', 'ungegn', 'ascii'] as const) {
    describe(`scheme: ${scheme}`, () => {
      for (const word of words) {
        it(`${word}`, () => {
          const { roman, back } = roundTrip(word, scheme)
          expect(back).toBe(word)
        })
      }
    })
  }
})

// ── toGujarati – forward-only spot checks ────────────────────────────────────

describe('toGujarati – ASCII scheme spot checks', () => {
  it('converts short and long vowels correctly', () => {
    expect(toGujarati('a', 'ascii')).toBe('અ')
    expect(toGujarati('aa', 'ascii')).toBe('આ')
    expect(toGujarati('i', 'ascii')).toBe('ઇ')
    expect(toGujarati('ii', 'ascii')).toBe('ઈ')
    expect(toGujarati('u', 'ascii')).toBe('ઉ')
    expect(toGujarati('uu', 'ascii')).toBe('ઊ')
  })

  it('consonant with inherent vowel', () => {
    expect(toGujarati('ka', 'ascii')).toBe('ક')
    expect(toGujarati('ga', 'ascii')).toBe('ગ')
  })

  it('consonant with explicit long vowel', () => {
    expect(toGujarati('kaa', 'ascii')).toBe('કા')
    expect(toGujarati('kii', 'ascii')).toBe('કી')
  })

  it('conjunct consonants', () => {
    expect(toGujarati('kta', 'ascii')).toBe('ક્ત')
    expect(toGujarati('pra', 'ascii')).toBe('પ્ર')
  })

  it('anusvara and visarga', () => {
    expect(toGujarati('kaM', 'ascii')).toBe('કં')
    expect(toGujarati('kaH', 'ascii')).toBe('કઃ')
  })

  it('numerals', () => {
    expect(toGujarati('0123', 'ascii')).toBe('૦૧૨૩')
  })
})

describe('toGujarati – ISO 15919 spot checks', () => {
  it('diacritical vowels round-trip', () => {
    expect(toGujarati('kā', 'iso15919')).toBe('કા')
    expect(toGujarati('kī', 'iso15919')).toBe('કી')
    expect(toGujarati('kū', 'iso15919')).toBe('કૂ')
  })

  it('conjunct', () => {
    expect(toGujarati('kta', 'iso15919')).toBe('ક્ત')
    expect(toGujarati('tra', 'iso15919')).toBe('ત્ર')
  })
})

// ── Punctuation ───────────────────────────────────────────────────────────────

describe('Punctuation handling', () => {
  it('danda → .', () => {
    expect(toRoman('।', 'ascii')).toBe('.')
  })

  it('double danda → ..', () => {
    expect(toRoman('॥', 'ascii')).toBe('..')
  })

  it('OM symbol → om', () => {
    expect(toRoman('ૐ', 'ascii')).toBe('om')
    expect(toRoman('ૐ', 'iso15919')).toBe('om')
  })

  it('avagraha → apostrophe', () => {
    expect(toRoman('ઽ', 'ascii')).toBe("'")
    expect(toRoman('ઽ', 'iso15919')).toBe("'")
  })

  it('standard Latin punctuation passes through unchanged', () => {
    const punct = ',.!?;:\'"()-—[]'
    expect(toRoman(punct, 'ascii')).toBe(punct)
    expect(toRoman(punct, 'iso15919')).toBe(punct)
  })

  it('mixed Gujarati and Latin punctuation', () => {
    expect(toRoman('ભારત, ગુજરાત!', 'ascii')).toBe('bhaarata, gujaraata!')
  })
})

// ── Auto-capitalize ───────────────────────────────────────────────────────────

describe('capitalize option', () => {
  it('capitalizes the first letter', () => {
    expect(toRoman('ગ', 'ascii', { capitalize: true })).toBe('Ga')
    expect(toRoman('ભારત', 'ascii', { capitalize: true })).toBe('Bhaarata')
  })

  it('capitalizes after . ! ?', () => {
    const input = 'ભારત। ગુજરાત'
    const result = toRoman(input, 'ascii', { capitalize: true })
    expect(result).toBe('Bhaarata. Gujaraata')
  })

  it('does not capitalize when option is false (default)', () => {
    expect(toRoman('ભારત', 'ascii')).toBe('bhaarata')
  })

  it('works via transliterate()', () => {
    expect(
      transliterate('ભારત', { scheme: 'ascii', capitalize: true }),
    ).toBe('Bhaarata')
  })
})

import type { SchemeMap, VowelPair } from '../schemes/types.js'
import { HALANT, INHERENT_VOWEL_CP, digitToNumeral } from '../unicode.js'

// ── Trie ─────────────────────────────────────────────────────────────────────

type TokenType = 'consonant' | 'vowel' | 'diacritic' | 'digit'

interface TrieValue {
  gujarati: string
  type: TokenType
  // For vowels: the matra form (may be null for inherent 'a')
  matra: string | null
  // For vowels: true when this is the inherent vowel ('a' / 'aa' etc.)
  isInherent: boolean
}

interface TrieNode {
  children: Map<string, TrieNode>
  value?: TrieValue
}

function newNode(): TrieNode {
  return { children: new Map() }
}

function insertTrie(root: TrieNode, roman: string, value: TrieValue): void {
  let node = root
  for (const ch of roman) {
    let child = node.children.get(ch)
    if (!child) {
      child = newNode()
      node.children.set(ch, child)
    }
    node = child
  }
  node.value = value
}

function longestMatch(
  root: TrieNode,
  text: string,
  start: number,
): { value: TrieValue; length: number } | null {
  let node = root
  let best: { value: TrieValue; length: number } | null = null
  let i = start
  while (i < text.length) {
    const ch = text[i]
    const child = node.children.get(ch)
    if (!child) break
    node = child
    i++
    if (node.value !== undefined) {
      best = { value: node.value, length: i - start }
    }
  }
  return best
}

// ── Trie builder ─────────────────────────────────────────────────────────────

function buildTrie(scheme: SchemeMap): TrieNode {
  const root = newNode()

  // Build a map from independent vowel cp → VowelPair for O(1) lookup
  const pairByIndependent = new Map<string, VowelPair>(
    scheme.vowelPairs.map((p) => [p.independent, p]),
  )

  // Consonants
  for (const [cp, roman] of Object.entries(scheme.consonants)) {
    insertTrie(root, roman, {
      gujarati: cp,
      type: 'consonant',
      matra: null,
      isInherent: false,
    })
  }

  // Vowels – derive matra from vowelPairs
  for (const [cp, roman] of Object.entries(scheme.vowels)) {
    const pair = pairByIndependent.get(cp)
    const isInherent = pair?.matra === null
    insertTrie(root, roman, {
      gujarati: cp,
      type: 'vowel',
      matra: pair?.matra ?? null,
      isInherent: isInherent ?? false,
    })
  }

  // Diacritics
  for (const [cp, roman] of Object.entries(scheme.diacritics)) {
    insertTrie(root, roman, {
      gujarati: cp,
      type: 'diacritic',
      matra: null,
      isInherent: false,
    })
  }

  // ASCII digits → Gujarati numerals
  for (let d = 0; d <= 9; d++) {
    insertTrie(root, String(d), {
      gujarati: digitToNumeral(String(d)),
      type: 'digit',
      matra: null,
      isInherent: false,
    })
  }

  return root
}

// ── Engine ───────────────────────────────────────────────────────────────────

export function toGujarati(text: string, scheme: SchemeMap): string {
  const trie = buildTrie(scheme)
  const out: string[] = []
  let i = 0

  // afterConsonant: the last token emitted was a consonant that still needs
  // its vowel resolved (either a matra, the inherent 'a', or a halant + next consonant).
  let afterConsonant = false

  while (i < text.length) {
    const match = longestMatch(trie, text, i)

    if (!match) {
      // Unrecognised character – if we were after a consonant, close it with inherent 'a'
      if (afterConsonant) {
        // inherent 'a' is implicit in Gujarati – no extra character needed
        afterConsonant = false
      }
      out.push(text[i])
      i++
      continue
    }

    const { value, length } = match
    i += length

    if (value.type === 'consonant') {
      if (afterConsonant) {
        // Two consecutive consonants: insert halant to suppress the first's inherent vowel
        out.push(HALANT)
      }
      out.push(value.gujarati)
      afterConsonant = true
    } else if (value.type === 'vowel') {
      if (afterConsonant) {
        // Vowel after consonant → use matra form
        if (value.isInherent) {
          // Inherent 'a' after consonant = no matra (it's implicit in Gujarati)
          // Do nothing — the consonant already carries the inherent vowel
        } else if (value.matra !== null) {
          out.push(value.matra)
        } else {
          // Vowel that has no matra (shouldn't happen for well-formed input, emit independent)
          out.push(value.gujarati)
        }
        afterConsonant = false
      } else {
        // Vowel at word-start or after another vowel → independent form
        if (value.isInherent) {
          out.push(INHERENT_VOWEL_CP) // अ independent
        } else {
          out.push(value.gujarati) // independent vowel letter
        }
        afterConsonant = false
      }
    } else if (value.type === 'diacritic') {
      // Diacritics can follow a consonant (after inherent vowel) or a vowel matra.
      // In both cases we just emit the diacritic combining character.
      // If still afterConsonant (no explicit vowel yet), the inherent 'a' is implied.
      afterConsonant = false
      out.push(value.gujarati)
    } else if (value.type === 'digit') {
      if (afterConsonant) {
        afterConsonant = false
      }
      out.push(value.gujarati)
    }
  }

  return out.join('')
}

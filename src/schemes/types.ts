export interface VowelPair {
  independent: string  // Gujarati independent vowel codepoint
  matra: string | null // Gujarati matra codepoint (null = inherent 'a', has no matra)
}

export interface SchemeMap {
  name: string

  // Forward: Gujarati character → Roman string
  consonants: Record<string, string>   // consonant cp → roman (WITHOUT inherent 'a')
  vowels: Record<string, string>       // independent vowel cp → roman
  matras: Record<string, string>       // matra cp → roman
  diacritics: Record<string, string>   // anusvara/visarga/candrabindu cp → roman

  // The roman string representing the inherent vowel 'a'
  inherentVowel: string

  // Pairs independent vowel ↔ matra for reverse lookup
  // Ordered: inherent 'a' first (matra = null), then the rest
  vowelPairs: VowelPair[]
}

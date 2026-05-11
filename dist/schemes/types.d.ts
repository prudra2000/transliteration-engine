export interface VowelPair {
    independent: string;
    matra: string | null;
}
export interface SchemeMap {
    name: string;
    consonants: Record<string, string>;
    vowels: Record<string, string>;
    matras: Record<string, string>;
    diacritics: Record<string, string>;
    inherentVowel: string;
    vowelPairs: VowelPair[];
}
//# sourceMappingURL=types.d.ts.map
import { HALANT, DANDA, DOUBLE_DANDA, OM, AVAGRAHA, isConsonant, isMatra, isIndependentVowel, isPostDiacritic, isNumeral, numeralToDigit, } from '../unicode.js';
// Capitalizes the first letter of the string and after each sentence-ending
// punctuation mark (. ! ?) followed by whitespace.
function capitalizeSentences(text) {
    return text
        .replace(/^(\s*)([a-z])/, (_, spaces, letter) => spaces + letter.toUpperCase())
        .replace(/([.!?]\s+)([a-z])/g, (_, punct, letter) => punct + letter.toUpperCase());
}
export function toRoman(text, scheme, options = {}) {
    const chars = [...text];
    const out = [];
    let i = 0;
    while (i < chars.length) {
        const ch = chars[i];
        if (isConsonant(ch)) {
            out.push(scheme.consonants[ch] ?? ch);
            i++;
            if (i < chars.length && chars[i] === HALANT) {
                i++;
                continue;
            }
            if (i < chars.length && isMatra(chars[i])) {
                out.push(scheme.matras[chars[i]] ?? chars[i]);
                i++;
            }
            else {
                out.push(scheme.inherentVowel);
            }
            while (i < chars.length && isPostDiacritic(chars[i])) {
                out.push(scheme.diacritics[chars[i]] ?? chars[i]);
                i++;
            }
        }
        else if (isIndependentVowel(ch)) {
            out.push(scheme.vowels[ch] ?? ch);
            i++;
            while (i < chars.length && isPostDiacritic(chars[i])) {
                out.push(scheme.diacritics[chars[i]] ?? chars[i]);
                i++;
            }
        }
        else if (isNumeral(ch)) {
            out.push(numeralToDigit(ch));
            i++;
        }
        else if (ch === DOUBLE_DANDA) {
            out.push('..');
            i++;
        }
        else if (ch === DANDA) {
            out.push('.');
            i++;
        }
        else if (ch === OM) {
            out.push('om');
            i++;
        }
        else if (ch === AVAGRAHA) {
            out.push("'");
            i++;
        }
        else {
            // Pass-through: Latin letters, spaces, standard punctuation, etc.
            out.push(ch);
            i++;
        }
    }
    const result = out.join('');
    return options.capitalize ? capitalizeSentences(result) : result;
}
//# sourceMappingURL=toRoman.js.map
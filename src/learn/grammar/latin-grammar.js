

const Latin = (() => {
    // TODO: Download grammar & vocab information from the server.
    // Assume access is available to 'conjugations', 'declensions', and 'dictioanry'.

    return {
        getGrammar (word) {
            const { type, dictionaryEntry } = word;

            let grammars, target, grammarType;
            // If props have been properly given, grammars and target are guaranteed to be assigned.
            if (type === 'verb') {
                [ grammars, target, grammarType ] = [ this.conjugations, word.conjugation, 'conjugation' ];
            } else if (type.includes('noun') || type.includes('adjective')) {
                [ grammars, target, grammarType ] = [ this.declensions, word.declension, 'declension' ];
            } else {
                // Only verbs, nouns, and adjectives are supported.
                // TODO: Support other word types.
                return;
            }
            grammars = grammars.filter(grammar => (
                grammar.name.toLocaleLowerCase() === target.toLocaleLowerCase()
            ));
            if (target !== 'Irregular') {
                return grammars[0];
            }
            return {
                grammarType,
                grammar: grammars.find(grammar => grammar.dictionaryEntry === dictionaryEntry)
            };
        },

        // TODO: cleanup getStem().
        getStem (word, { grammarType, grammar }) {
            let conjugation, declension;
            if (grammarType === 'conjugation') {
                conjugation = grammar;
            } else if (grammarType === 'declension') {
                declension = grammar;
            } else {
                return;
            }
            const { type, dictionaryEntry, gender } = word;
            if (type === 'verb') {
                // If the word is a verb, then the dictionary entry is the principal parts,
                // and the stem is the second principal part minus the infinitive ending.
                return dictionaryEntry.split(' ')[1].slice(0, -3);
            } else if (type.includes('noun') || type.includes('adjective')) {
                // If the word is a noun or adjective, then the stem is the result of removing the case ending
                // from the genitive singular form. If it is a noun, the genitive singular is the second word
                // in the dictionary entry; if it is an adjective with one ending, it is derived just as a noun;
                // if it is an adjective of two endings, the stem can be derived from removing the nom.neut.sg. ending
                // from the second word in the dictionary entry; if it is an adjective of three endings, the stem can
                // be derived from removing the nom.fem.sg. ending from the second word in the dictionary entry.
                if (type.includes('adjective') && dictionaryEntry.split(' ').length === 3) {
                    if (dictionaryEntry.split(' ')[1] !== 'gen.') {
                        // [0][1] is the nom.sg.f. entry for an adjective of three endings.
                        const ending = declension.data.find(x => x.gender === gender).table[0][1];
                        // The - allows indexing from the end of the string, and the slice(1) removes the prefixed '-'
                        return dictionaryEntry.split(' ')[1].slice(0, -ending.slice(1).length);
                    } else {
                        // [0][2] is the nom.sg.n. entry for an adjective of three endings.
                        const ending = declension.data.find(x => x.gender === gender).table[0][2];
                        // The - allows indexing from the end of the string, and the slice(1) removes the prefixed '-'
                        return dictionaryEntry.split(' ')[1].slice(0, -ending.slice(1).length);
                    }
                }
                if (type.includes('noun')) {
                    // [1][1] is the gen.sg. entry for a noun.
                    const ending = declension.data.find(x => x.gender === gender).table[1][1];
                    // The - allows indexing from the end of the string, and the slice(1) removes the prefixed '-'
                    return dictionaryEntry.split(' ')[1].slice(0, -ending.slice(1).length);
                }
            }
        },

        getFormTables (word, { grammarType, grammar }) {
            // Clone the tables to prevent alteration of the originals
            grammar = grammar ? JSON.parse(JSON.stringify(grammar)) : undefined;

            if (grammarType === 'conjugation') {
                const stem = this.getStem(word, { grammarType, grammar });
                grammar.data = grammar.data.map(data => {
                    data.table = data.table.map(row => (
                        row.map((col, index) => (index === 0 || word.conjugation === 'Irregular')
                            ? col : (stem + col.slice(1)))
                    ));
                    return data;
                });
            } else if (grammarType === 'declension') {
                const stem = this.getStem(word, { grammarType, grammar });
                grammar.data = grammar.data.map(data => {
                    data.table = data.table.map(row => (
                        row.map((col, index) => (index === 0 || word.declension === 'Irregular')
                            ? col : (stem + col.slice(1)))
                    ));
                    return data;
                });
            }

            return grammar;
        }
    };
})();

export default Latin;
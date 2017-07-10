
const Latin = {
    getGrammar (word) {
        const { type, dictionaryEntry } = word;

        // If props have been properly given, grammars and target are guaranteed to be assigned.
        let grammars, target, grammarType;
        if (type === 'verb') {
            [ grammars, target, grammarType ] = [ this.conjugations, word.conjugation, 'conjugation' ];
        } else if (type.includes('noun') || type.includes('adjective')) {
            [ grammars, target, grammarType ] = [ this.declensions, word.declension, 'declension' ];
        } else {
            // Only verbs, nouns, and adjectives are supported.
            // TODO: Support other word types.
            return;
        }

        grammars = grammars.filter(grammar => grammar.name.toLocaleLowerCase() === target.toLocaleLowerCase());
        if (target !== 'Irregular') {
            return {
                grammarType,
                grammar: grammars[0]
            };
        }
        return {
            grammarType,
            grammar: grammars.find(grammar => grammar.dictionaryEntry === dictionaryEntry)
        };
    },

    // TODO: complete verb portion of, and cleanup, getStem().
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

    getFormTables (word, { grammarType, grammar } = {}) {
        // If no grammar is provided, gather it.
        if (!grammarType || !grammar) {
            ({ grammarType, grammar } = this.getGrammar(word));
        }

        // Clone the tables to prevent alteration of the originals
        grammar = grammar ? JSON.parse(JSON.stringify(grammar)) : undefined;

        console.log({ word, g: { grammarType, grammar }});
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

        return { grammarType, grammar };
    }
};

// TODO: Download grammar & vocab information from the server.
// TODO: Extract all Latin grammar into a file 'latin-grammar.json'
const firstConjugation = {
    name: 'First',
    theme: 'ā',
    data: [
        {
            tense: "Present",
            mood: "Indicative",
            voice: "Active",
            table: [
                ["1st", "-ō", "-āmus"],
                ["2nd", "-ās",  "-ātis"],
                ["3rd", "-at", "-ant"]
            ]
        },
        {
            tense: "Future",
            mood: "Indicative",
            voice: "Active",
            table: [
                ["1st", "-ābō", "-ābimus"],
                ["2nd", "-ābis", "-ābitis"],
                ["3rd", "-ābit", "-ābunt"]
            ]
        }
    ]
};
const secondConjugation = {
    name: 'Second',
    theme: 'ē',
    data: [
        {
            tense: 'Present',
            mood: 'Indicative',
            voice: 'Active',
            table: [
                ["1st", "-eō", "-ēmus"],
                ["2nd", "-ēs", "-ētis"],
                ["3rd", "-et", "-ent"]
            ]
        },
        {
            tense: 'Perfect',
            mood: 'Indicative',
            voice: 'Active',
            table: [
                ["1st", "-uī", "-uimus"],
                ["2nd", "-uistī", "-uistis"],
                ["3rd", "-uit", "-ērunt"]
            ]
        }
    ]
};
const irregularConjugationSumEsse = {
    name: 'Irregular',
    dictionaryEntry: 'sum esse fuī futūrum',
    data: [
        {
            tense: 'Present',
            mood: 'Indicative',
            voice: 'Active',
            table: [
                ["1st", "sum", "sumus"],
                ["2nd", "es", "estis"],
                ["3rd", "est", "sunt"]
            ]
        },
        {
            tense: 'Perfect',
            mood: 'Indicative',
            voice: 'Active',
            table: [
                ["1st", "fuī", "fuimus"],
                ["2nd", "fuistī", "fuistis"],
                ["3rd", "fuit", "fuērunt"]
            ]
        }
    ]
};
Latin.conjugations = [firstConjugation, secondConjugation, irregularConjugationSumEsse];

const firstDeclension = {
    name: 'First',
    data: [
        {
            gender: "f",
            table: [
                ["Nom./Voc.", "-a", "-ae"],
                ["Gen.", "-ae", "-ārum"],
                ["Dat.", "-ae", "-īs"],
                ["Acc.", "-am",  "-ās"],
                ["Abl.", "-ā",  "-īs"]
            ]
        }
    ]
};
const secondDeclension = {
    name: 'Second',
    data: [
        {
            gender: "m",
            table: [
                ["Nom.", "-us/er", "-ī"],
                ["Gen.", "-ī", "-ōrum"],
                ["Dat.", "-ō", "-īs"],
                ["Acc.", "-um", "-ōs"],
                ["Abl.", "-ō", "-īs"],
                ["Voc.", "-e/er", "-ī"]
            ]
        },
        {
            gender: "n",
            table: [
                ["Nom./Voc.", "-um", "-a"],
                ["Gen.", "-ī", "-ōrum"],
                ["Dat.", "-ō", "-īs"],
                ["Acc.", "-um", "-a"],
                ["Abl.", "-ō", "-īs"]
            ]
        }
    ]
};
const irregularDeclensionEgo = {
    name: 'Irregular',
    dictionaryEntry: 'egō, meī',
    data: [
        {
            table: [
                ['Nom.', 'egō', 'nōs'],
                ['Gen.', 'meī', 'nostrum'],
                ['Dat.', 'mihi', 'nōbis'],
                ['Acc.', 'mē', 'nōs'],
                ['Abl.', 'mē', 'nōbīs']
            ]
        }
    ]
};
Latin.declensions = [firstDeclension, secondDeclension, irregularDeclensionEgo];


export default Latin;
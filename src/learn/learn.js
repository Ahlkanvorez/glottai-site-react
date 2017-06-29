import React from 'react';
import { Grammar } from './grammar/grammar.js';

// TODO: Generalize the Latin specific grammar into a library, so a Latin or Greek object can be passed as
// TODO: (continued) a parameter and handle all of the specific gramamr for each language.
const WordDefinition = props => (
    <dl>
        <dt>{ props.word.dictionaryEntry }</dt>
        <dd>({ props.word.type }) { props.word.definition }</dd>
    </dl>
);

// props = { word, conjugation, declension }
const WordInfo = props => (
    <div>
        { props.word ? (
            <div>
                <WordDefinition word={ props.word } />
                <a href={props.word.lexicon}>Lexicon</a>
                <Grammar conjugations={ [props.conjugation] }
                         declensions={ [props.declension] } />
            </div>
        ) : null }
    </div>
);

// { word, conjugations, declensions }
class Word extends React.Component {
    constructor (props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
        this.getConjugation = this.getConjugation.bind(this);
        this.getDeclension = this.getDeclension.bind(this);
    }

    // TODO: Improve code reuse between getDeclension and getConjugation.
    getDeclension () {
        if (this.props.word.type.indexOf('noun') >= 0 || this.props.word.type.indexOf('adjective') >= 0) {
            const declensions = this.props.declensions
                .filter(declension => (
                    declension.name.toLocaleLowerCase() === this.props.word.declension.toLocaleLowerCase()
                ));
            if (this.props.word.declension !== 'Irregular') {
                return declensions[0];
            }
            return declensions.filter(declension => declension.dictionaryEntry === this.props.word.dictionaryEntry)[0];
        }
    }

    getConjugation () {
        if (this.props.word.type === 'verb') {
            const conjugations = this.props.conjugations
                .filter(conjugation => (
                    conjugation.name.toLocaleLowerCase() === this.props.word.conjugation.toLocaleLowerCase()
                ));
            if (this.props.word.conjugation !== 'Irregular') {
                return conjugations[0];
            }
            return conjugations.filter(conjugation => conjugation.dictionaryEntry === this.props.word.dictionaryEntry)[0];
        }
        // If word is not a verb, undefined should be the result.
    }

    getStem(conjugation, declension) {
        if (this.props.word.type === 'verb') {
            // If the word is a verb, then the dictionary entry is the principal parts,
            // and the stem is the second principal part minus the infinitive ending.
            return this.props.word.dictionaryEntry.split(' ')[1].slice(0, -3);
        } else if (this.props.word.type === 'noun' || this.props.word.type === 'adjective') {
            // If the word is a noun or adjective, then the stem is the result of removing the case ending
            // from the genitive singular form. If it is a noun, the genitive singular is the second word
            // in the dictionary entry; if it is an adjective with one ending, it is derived just as a noun;
            // if it is an adjective of two endings, the stem can be derived from removing the nom.neut.sg. ending
            // from the second word in the dictionary entry; if it is an adjective of three endings, the stem can
            // be derived from removing the nom.fem.sg. ending from the second word in the dictionary entry.
            if (this.props.word.type === 'noun' || this.props.word.dictionaryEntry.split(' ').length === 2) {
                const genSg = declension.data.filter(x => x.gender === this.props.word.gender)[0].table[1][1];
                // The - allows indexing from the end of the string, and the added 1 accounts for the fact that .length
                // is 1 greater in magnitude than the desired index.
                return this.props.word.dictionaryEntry.split(' ')[1].slice(0, 1 - genSg.length);
            }
        }
    }

    showInfo () {
        let conjugation = this.getConjugation(this.props.word);
        let declension = this.getDeclension(this.props.word);
        // Clone the tables to prevent alteration of the originals, and replace
        conjugation = conjugation ? JSON.parse(JSON.stringify(conjugation)) : undefined;
        declension = declension ? JSON.parse(JSON.stringify(declension)) : undefined;
        if (conjugation) {
            let stem = this.getStem(conjugation, declension);
            conjugation.data = conjugation.data.map(data => {
                data.table = data.table.map(row => (
                    row.map((col, index) => (index === 0 || this.props.word.conjugation === 'Irregular')
                        ? col : (stem + col.slice(1)))
                ));
                return data;
            });
        }
        if (declension) {
            let stem = this.getStem(conjugation, declension);
            declension.data = declension.data.map(data => {
                data.table = data.table.map(row => (
                    row.map((col, index) => (index === 0 || this.props.word.declension === 'Irregular')
                        ? col : (stem + col.slice(1)))
                ));
                return data;
            });
        }
        this.props.onClick(this.props.word, conjugation, declension);
    }

    render () {
        return (
            <span key={this.props.word.form} onClick={this.showInfo}>
                { this.props.word.form }
            </span>
        );
    }
}

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.showWordInfo = this.showWordInfo.bind(this);
    }

    showWordInfo (word, conjugation, declension) {
        this.setState({ wordInfo: <WordInfo word={word} conjugation={conjugation} declension={declension} /> });
    }

    render () {
        return (
            <span>
                { this.props.words.map((w, index) =>
                    <span key={w.form + '_' + index} style={{ marginRight: "0.5em" }}>
                        <Word word={w}
                              conjugations={this.props.conjugations}
                              declensions={this.props.declensions}
                              onClick={this.showWordInfo} />
                    </span>
                ) }
                { this.state.wordInfo }
            </span>
        );
    }
}

const Learn = props => (
    <Words words={props.words} conjugations={props.conjugations} declensions={props.declensions} />
);

export { Learn };
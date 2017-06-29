import React from 'react';
import { Grammar } from './grammar/grammar.js';

// props = { word, conjugation, declension }
const WordInfo = props => (
    <div>
        { props.word ? (
            <div>
                <dl>
                    <dt>{ props.word.dictionaryEntry }</dt>
                    <dd>({ props.word.type }) { props.word.definition }</dd>

                </dl>
                <Grammar conjugations={[props.conjugation]}
                         declensions={[props.declension]} />
            </div>
        ) : null }
    </div>
);

// { words, conjugations, declensions }
class Learn extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};

        this.showInfo = this.showInfo.bind(this);
        this.getConjugation = this.getConjugation.bind(this);
        this.getDeclension = this.getDeclension.bind(this);
    }

    getDeclension (word) {
        // TODO: Retrieve the proper declension for the word.
    }

    getConjugation (word) {
        if (word.type === 'verb') {
            const conjugations = this.props.conjugations
                .filter(conjugation => (
                    conjugation.name.toLocaleLowerCase() === word.conjugation.toLocaleLowerCase()
                ));
            if (word.conjugation !== 'Irregular') {
                return conjugations[0];
            }
            return conjugations.filter(conjugation => conjugation.dictionaryEntry === word.dictionaryEntry)[0];
        }
        // If word is not a verb, undefined should be the result.
    }

    getStem(word) {
        if (word.type === 'verb') {
            // If the word is a verb, then the dictionary entry is the principal parts,
            // and the stem is the second principal part minus the infinitive ending.
            return word.dictionaryEntry.split(' ')[1].slice(0, -3);
        } else if (word.type === 'noun' || word.type === 'adjective') {
            // TODO: Do the same for nouns and adjectives.
        }
    }

    showInfo (word) {
        let conjugation = this.getConjugation(word);
        let declension = this.getDeclension(word);
        // Clone the tables to prevent alteration of the originals, and replace
        conjugation = conjugation ? JSON.parse(JSON.stringify(conjugation)) : undefined;
        declension = declension ? JSON.parse(JSON.stringify(declension)) : undefined;
        if (conjugation) {
            let stem = this.getStem(word, conjugation);
            conjugation.data = conjugation.data.map(data => {
                data.table = data.table.map(row => (
                    row.map((col, index) => (index === 0 || word.conjugation === 'Irregular') ? col : (stem + col.slice(1)))
                ));
                return data;
            });
        }
        if (declension) {
            // TODO: do the same for nouns & adjectives
        }
        this.setState({ word, conjugation, declension });
    }

    render () {
        return (
            <div>
                <div className="row">
                    <h3>Dictionary</h3>
                    <ul>
                        { this.props.words.map(w => (
                            <li key={w.form} onClick={() => this.showInfo(w)}>
                                {w.form}
                            </li>
                        )) }
                    </ul>
                </div>
                <WordInfo word={this.state.word}
                          conjugation={this.state.conjugation}
                          declension={this.state.declension} />
            </div>
        );
    }
}

export { Learn };
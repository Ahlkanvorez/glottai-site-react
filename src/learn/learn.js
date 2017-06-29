import React from 'react';
import { Grammar } from './grammar/grammar.js';

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

    getDeclension () {
        // TODO: Retrieve the proper declension for the word.
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

    getStem() {
        if (this.props.word.type === 'verb') {
            // If the word is a verb, then the dictionary entry is the principal parts,
            // and the stem is the second principal part minus the infinitive ending.
            return this.props.word.dictionaryEntry.split(' ')[1].slice(0, -3);
        } else if (this.props.word.type === 'noun' || this.props.word.type === 'adjective') {
            // TODO: Do the same for nouns and adjectives.
        }
    }

    showInfo () {
        let conjugation = this.getConjugation(this.props.word);
        let declension = this.getDeclension(this.props.word);
        // Clone the tables to prevent alteration of the originals, and replace
        conjugation = conjugation ? JSON.parse(JSON.stringify(conjugation)) : undefined;
        declension = declension ? JSON.parse(JSON.stringify(declension)) : undefined;
        if (conjugation) {
            let stem = this.getStem(this.props.word, conjugation);
            conjugation.data = conjugation.data.map(data => {
                data.table = data.table.map(row => (
                    row.map((col, index) => (index === 0 || this.props.word.conjugation === 'Irregular') ? col : (stem + col.slice(1)))
                ));
                return data;
            });
        }
        if (declension) {
            // TODO: do the same for nouns & adjectives
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
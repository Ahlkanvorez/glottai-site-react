import React from 'react';
import { Grammar } from './grammar/grammar.js';
import Latin from './grammar/latin-grammar.js';

// TODO: Generalize the Latin specific grammar into a library, so a Latin or Greek object can be passed as
// TODO: (continued) a parameter and handle all of the specific grammar for each language.
const WordDefinition = ({ word: { dictionaryEntry, type, definition } }) => (
    <dl>
        <dt>{ dictionaryEntry }</dt>
        <dd>({ type }) { definition }</dd>
    </dl>
);

const WordInfo = ({ word, conjugation, declension }) => (
    <div>
        { word ? (
            <div>
                <WordDefinition word={ word } />
                <a href={word.lexicon}>Lexicon</a>
                <Grammar conjugations={ conjugation ? [conjugation] : [] }
                         declensions={ declension ? [declension] : [] } />
            </div>
        ) : null }
    </div>
);

class Word extends React.Component {
    constructor (props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
    }

    showInfo () {
        const { word, language } = this.props;

        let tables;
        switch (language.toLocaleLowerCase()) {
            case 'latin':
                tables = Latin.getFormTables(word);
                break;
            // TODO: Add support for Greek.
        }
        this.props.onClick(word, tables);
    }

    render () {
        const { form } = this.props.word;
        return (
            <span key={form} onClick={this.showInfo}>
                { form }
            </span>
        );
    }
}

const Words = ({ words, onClick, language }) => (
    <span>
        { words.map((w, index) =>
            <span key={w.form + '_' + index} style={{ marginRight: "0.5em" }}>
                <Word word={w}
                      language={language}
                      onClick={onClick} />
            </span>
        ) }
    </span>
);

export { Words, WordInfo };
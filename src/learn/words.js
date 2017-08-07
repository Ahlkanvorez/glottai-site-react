import React from 'react';
import { Grammar } from './grammar/grammar.js';
import Latin from './grammar/latin-grammar.js';

const WordDefinition = ({ word: { dictionaryEntry, type, definition } }) => (
    <dl>
        <dt>{ dictionaryEntry }</dt>
        <dd>({ type }) { definition }</dd>
    </dl>
);

const WordInfo = ({ word, conjugation, declension }) => (
    <div>
        <WordDefinition word={ word } />
        <a target="_blank" href={word.lexicon}>Lexicon</a>
        <Grammar conjugations={ conjugation ? [ conjugation ] : [] }
                    declensions={ declension ? [ declension ] : [] } />

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
            <span key={w.form + '_' + index} style={{ marginRight: '0.5em' }}>
                <Word word={w}
                      language={language}
                      onClick={onClick} />
            </span>
        ) }
    </span>
);

export { Words, WordInfo };

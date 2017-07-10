import React, { Component } from 'react';
import './App.css';
import { Grammar } from './learn/grammar/grammar.js';
import { Navigation } from './navigation.js';
import { About } from './about.js';
import { Learn } from './learn/learn.js';

// TODO: Pull this data from the server.
const words = [
    {
        form: 'nātūra',
        dictionaryEntry: 'nātūra nātūrae f.',
        definition: 'Nature; (fig.) the property, quality, inclination, or essence of a thing',
        lexicon: 'http://www.perseus.tufts.edu/hopper/morph?l=natura&la=la#lexicon',
        caseName: 'Nominative',
        number: 'Singular',
        gender: 'f',
        type: 'noun',
        declension: 'First'
    },
    {
        form: 'aurae',
        dictionaryEntry: 'aura aurae f.',
        definition: 'the air (in motion), a breeze, breath of air, wind, blast',
        lexicon: 'http://www.perseus.tufts.edu/hopper/morph?l=aura&la=la#lexicon',
        caseName: 'Genitive',
        number: 'Singular',
        gender: 'f',
        type: 'noun',
        declension: 'first'
    },
    {
        form: 'mōta',
        dictionaryEntry: 'mōtus mōta mōtum',
        definition: 'having been moved, shaken, stirred',
        lexicon: 'http://www.perseus.tufts.edu/hopper/morph?l=motus&la=la#lexicon',
        caseName: 'Nominative',
        number: 'Singular',
        gender: 'f',
        type: 'adjective',
        declension: 'first'
    },
    {
        form: 'mihi',
        dictionaryEntry: 'egō meī',
        definition: 'me',
        lexicon: 'http://www.perseus.tufts.edu/hopper/morph?l=mihi&la=la',
        caseName: 'Dative',
        number: 'Singular',
        type: 'personal pronoun',
        declension: 'Irregular'
    },
    {
        form: "placuit",
        dictionaryEntry: 'placeō placēre placuī placitum',
        definition: "to please, give pleasure, be approved, be pleasing, be agreeable, be acceptable, suit, satisfy",
        lexicon: "http://www.perseus.tufts.edu/hopper/morph?l=placere&la=la#lexicon",
        person: '3rd',
        number: "Singular",
        tense: "Perfect",
        mood: 'Indicative',
        voice: "Active",
        type: "verb",
        conjugation: "Second"
    },
    {
        form: "est",
        dictionaryEntry: 'sum esse fuī futūrum',
        definition: "to be, exist, live",
        lexicon: "http://www.perseus.tufts.edu/hopper/morph?l=esse&la=la#lexicon",
        person: "3rd",
        number: "Singular",
        tense: "Present",
        voice: "Active",
        mood: "Indicative",
        type: "verb",
        conjugation: "Irregular"
    }
];
const cards = [
    {
        anteInput: [words.find(w => w.form === 'nātūra')],
        postInput: [words.find(w => w.form === 'placuit')],
        input: words.find(w => w.form === 'mihi'),
        literalTranslation: 'Nature has pleased me.',
        idiomaticTranslation: 'I have enjoyed nature'
    },
    {
        anteInput: [
            words.find(w => w.form === 'nātūra'),
            words.find(w => w.form === 'aurae')
        ],
        postInput: [
            words.find(w => w.form === 'mōta')
        ],
        input: words.find(w => w.form === 'est'),
        literalTranslation: 'The direction of the wind has been moved',
        idiomaticTranslation: 'The wind has changed direction'
    }
];

class App extends Component {
    constructor (props) {
        super(props);
        this.state = { view: 'learn' };

        this.handleViewChange = this.handleViewChange.bind(this);
    }

    handleViewChange (view) {
        this.setState({ view });
    }

    render () {
        const selectView = view => {
            const language = 'latin';
            switch (view.toLowerCase()) {
                case 'grammar':
                    return (<Grammar language={language} />);
                case 'about':
                    return (<About />);
                default:
                    return (<Learn cards={cards}
                                   words={words}
                                   language={language} />);
            }
        };
        return (
            <div>
                <Navigation handleViewChange={this.handleViewChange} />
                <div className="container" style={{ marginTop: '75px' }}>
                    {selectView(this.state.view)}
                </div>
            </div>
        );
    }
}

export default App;
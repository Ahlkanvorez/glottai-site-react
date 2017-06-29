import React, { Component } from 'react';
import './App.css';
import { Grammar } from './learn/grammar/grammar.js';
import { Navigation } from './navigation.js';
import { About } from './about.js';
import { Learn } from './learn/learn.js';


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
const conjugations = [firstConjugation, secondConjugation, irregularConjugationSumEsse];

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
const declensions = [firstDeclension, secondDeclension, irregularDeclensionEgo];

const words = [
    {
        form: 'nātūra',
        dictionaryEntry: 'nātūra, nātūrae f.',
        definition: 'Nature; (fig.) the property, quality, inclination, or essence of a thing',
        lexicon: 'http://www.perseus.tufts.edu/hopper/morph?l=natura&la=la#lexicon',
        caseName: 'Nominative',
        number: 'Singular',
        gender: 'f',
        type: 'noun',
        declension: 'First'
    },
    {
        form: 'mihi',
        dictionaryEntry: 'egō, meī',
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
        form: "esse",
        dictionaryEntry: 'sum esse fuī futūrum',
        definition: "to be, exist, live",
        lexicon: "http://www.perseus.tufts.edu/hopper/morph?l=esse&la=la#lexicon",
        number: "Infinitive",
        tense: "Present",
        voice: "Active",
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
            switch (view.toLowerCase()) {
                case 'grammar':
                    return (<Grammar conjugations={conjugations}
                                     declensions={declensions} />);
                case 'about':
                    return (<About />);
                default:
                    return (<Learn card={cards[0]}
                                   words={words}
                                   conjugations={conjugations}
                                   declensions={declensions} />);
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
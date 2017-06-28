import React, { Component } from 'react';
import './App.css';
import { GrammarComponent} from './grammar/grammar.js';
import { Navigation } from './navigation.js';
import { About } from './about.js';


const firstConjugation = {
    name: 'First Conjugation',
    theme: 'long a',
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
    name: 'Second Conjugation',
    theme: 'long e',
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
const conjugations = [firstConjugation, secondConjugation];

const firstDeclension = {
    name: 'First Declension',
    data: [
        {
            gender: "f.",
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
    name: 'Second Declension',
    data: [
        {
            gender: "m.",
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
            gender: "n.",
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
const declensions = [firstDeclension, secondDeclension];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { view: 'Grammar' };

        this.handleViewChange = this.handleViewChange.bind(this);
    }

    handleViewChange(view) {
        this.setState({ view });
    }

    render() {
        const selectView = view => {
            switch (view) {
                case 'Grammar':
                    return (<GrammarComponent conjugations={conjugations}
                                              declensions={declensions} />);
                default: // 'Learn'
                    return (<p>This view is still under development.</p>);
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
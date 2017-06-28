import React, { Component } from 'react';
import './App.css';
import { GrammarComponent} from './grammar/grammar.js';


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
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle"
                                    data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/">γλῶτται</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><a href="/learn">Learn</a></li>
                                <li><a href="/grammar">Grammar</a></li>
                                <li><a href="/">About</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container" style={{ marginTop: '75px' }}>
                    <GrammarComponent conjugations={conjugations} declensions={declensions} />
                </div>
            </div>
        );
    }
}

export default App;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grammar from './grammar/grammar.js';


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

const makeKey = data => data.tense + ' ' + data.mood + ' ' + data.voice;

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="App App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>ΓΛΩΤΤΑΙ</h2>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Grammar</h2>
                        {conjugations.map(conjugation => (
                            <div key={conjugation.name} className="row">
                                <h3>{ conjugation.name } ({conjugation.theme})</h3>
                                {conjugation.data.map(data =>
                                    (<Grammar className="col-md-4" key={makeKey(data)} data={ data } />))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
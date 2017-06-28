import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Conjugation } from './grammar/grammar.js';


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
                            <Conjugation key={conjugation.name} conjugation={conjugation} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
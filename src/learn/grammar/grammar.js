import React from 'react';
import { QuizInput } from './grammar-tables.js';
import { Conjugation, Declension } from './grammar-info.js';
import Latin from './latin-grammar.js';
import './grammar.css';

const Grammar = ({ conjugations, declensions, language }) => {
    if (language && !conjugations && !declensions) {
        switch (language) {
            case 'latin':
                [ conjugations, declensions ] = [
                    Latin.conjugations,
                    Latin.declensions
                ];
                break;
                // TODO: Add support for Greek.
        }
    }
    return (
        <div className="row">
            <div className="col-lg-12">
                <h2>Grammar</h2>
                {conjugations.filter(x => x !== undefined).map(conjugation => (
                    <Conjugation key={conjugation.name}
                                 conjugation={conjugation} />
                ))}
                {declensions.filter(x => x !== undefined).map(declension => (
                    <Declension key={declension.name}
                                declension={declension} />
                ))}
            </div>
        </div>
    );
};

export { Grammar, QuizInput };

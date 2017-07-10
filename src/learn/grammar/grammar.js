import React from 'react';
import { QuizInput } from './grammar-tables.js';
import { Conjugation, Declension } from './grammar-info.js';
import './grammar.css';

const Grammar = ({ conjugations, declensions }) => (
    <div className="row">
        <div className="col-lg-12">
            <h2>Grammar</h2>
            {conjugations.filter(x => x !== undefined).map(conjugation => {
                console.log(conjugation);
                return (
                <Conjugation key={conjugation.name} conjugation={conjugation} />
            );})}
            {declensions.filter(x => x !== undefined).map(declension => (
                <Declension key={declension.name} declension={declension} />
            ))}
        </div>
    </div>
);

export { Grammar, QuizInput };
import React from 'react';
import { GrammarQuizTable } from './grammar-tables';

const GrammarInfo = ({ title, data, makeKey, headers }) => (
    <div className="row">
        <h3>{ title }</h3>
        { data.map((data, index) =>
            (<GrammarQuizTable className="col-md-4"
                               key={ makeKey ? makeKey(data) : index }
                               data={ data }
                               headers={ headers } />)
        )}
    </div>
);

const Conjugation = ({ data: { tense, mood, voice }, conjugation: { name, theme, data } }) => {
    const makeConjugationKey = data => tense + ' ' + mood + ' ' + voice;
    return (
        <GrammarInfo title={ `${name} Conjugation` +
        (theme ? '(' + theme + ')' : '') }
                     data={data}
                     headers={ ['Person', 'Sg.', 'Pl.'] }
                     makeKey={makeConjugationKey} />
    );
};

const Declension = ({ data: { name, gender }, declension: { name: declensionName, data } }) => {
    const makeDeclensionKey = data => name + ' ' + gender;
    return (
        <GrammarInfo title={declensionName + ' Declension'}
                     data={data}
                     headers={ [ 'Case', 'Sg.', 'Pl.' ] }
                     makeKey={makeDeclensionKey} />
    );
};

export { Conjugation, Declension, GrammarInfo };
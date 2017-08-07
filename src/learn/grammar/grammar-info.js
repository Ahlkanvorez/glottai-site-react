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

const Conjugation = ({ conjugation: { name, theme, data } }) => {
    const makeConjugationKey = data => data.tense + ' ' + data.mood + ' '
        + data.voice;
    return (
        <GrammarInfo title={
                        `${name} Conjugation` + (theme ? '(' + theme + ')' : '')
                    }
                     data={data}
                     headers={ [ 'Person', 'Sg.', 'Pl.' ] }
                     makeKey={makeConjugationKey} />
    );
};

const Declension = ({ declension: { name, data } }) => {
    const makeDeclensionKey = data => data.name + ' ' + data.gender;
    return (
        <GrammarInfo title={name + ' Declension'}
                     data={data}
                     headers={ [ 'Case', 'Sg.', 'Pl.' ] }
                     makeKey={makeDeclensionKey} />
    );
};

export { Conjugation, Declension, GrammarInfo };

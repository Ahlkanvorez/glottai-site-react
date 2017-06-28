import React from 'react';


// props = { className, data, headers }
const GrammarTable = props => (
    <div className={ props.className }>
        <h4>{ props.data.tense } { props.data.mood } { props.data.voice }</h4>
        <table className="table">
            <thead className="thead">
            <tr>{ props.headers.map(n => <th>{ n }</th>) }</tr>
            </thead>
            <tbody>
            { props.data.table.map(row => (
                <tr key={row}>
                    { row.map(col => <td key={col}>{col}</td>) }
                </tr>
            )) }
            </tbody>
        </table>
    </div>
);

// props = { title, data, headers, makeKey (optional) }
const Grammar = props => (
    <div className="row">
        <h3>{ props.title }</h3>
        { props.data.map((data, index) =>
            (<GrammarTable className="col-md-4"
                           key={ props.makekey ? props.makeKey(data) : index }
                           data={ data }
                           headers={ props.headers } />)
        )}
    </div>
);

// props = { conjugation }
const Conjugation = props => {
    const makeConjugationKey = data => data.tense + ' ' + data.mood + ' ' + data.voice;
    return (
        <Grammar title={ props.conjugation.name + '(' + props.conjugation.theme + ')' }
                 data={props.conjugation.data}
                 headers={ ['Person', 'Sg.', 'Pl.'] }
                 makeKey={makeConjugationKey} />
    );
};

// props = { declension }
const Declension = props => {
    const makeDeclensionKey = data => data.name + ' ' + data.gender;
    return (
        <Grammar title={props.declension.name}
                 data={props.declension.data}
                 headers={ [ 'Case', 'Sg.', 'Pl.' ] }
                 makeKey={makeDeclensionKey} />
    );
};

const GrammarComponent = props => (
    <div className="row">
        <div className="col-lg-12">
            <h2>Grammar</h2>
            {props.conjugations.map(conjugation => (
                <Conjugation key={conjugation.name} conjugation={conjugation} />
            ))}
            {props.declensions.map(declension => (
                <Declension key={declension.name} declension={declension} />
            ))}
        </div>
    </div>
);

export { GrammarComponent };
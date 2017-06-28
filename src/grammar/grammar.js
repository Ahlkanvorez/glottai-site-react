import React from 'react';


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

const makeKey = data => data.tense + ' ' + data.mood + ' ' + data.voice;

const Grammar = props => (
    <div className="row">
        <h3>{ props.title }</h3>
        { props.data.map(data =>
            (<GrammarTable className="col-md-4"
                           key={ makeKey(data) }
                           data={ data }
                           headers={ props.headers } />)
        )}
    </div>
);

const Conjugation = props => (
    <Grammar title={ props.conjugation.name + '(' + props.conjugation.theme + ')' }
             data={props.conjugation.data}
             headers={ ['Person', 'Sg.', 'Pl.'] } />
);

export { Conjugation };
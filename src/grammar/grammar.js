import React from 'react';


const Grammar = props => (
    <div className={props.className}>
        <h4>{ props.data.tense } { props.data.mood } { props.data.voice }</h4>
        <table className="table">
            <thead className="thead">
            <tr>
                <th>Person</th>
                <th>Sg.</th>
                <th>Pl.</th>
            </tr>
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

export default Grammar;
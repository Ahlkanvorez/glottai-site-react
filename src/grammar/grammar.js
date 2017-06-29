import React from 'react';
import './grammar.css';


// props = { className, data, headers }
const GrammarTable = props => (
    <div className={ props.className }>
        <h4>{ props.data.tense } { props.data.mood } { props.data.voice }</h4>
        <table className="table">
            <thead className="thead">
            <tr>{ props.headers.map((n, index) => <th key={index}>{ n }</th>) }</tr>
            </thead>
            <tbody>
            { props.data.table.map((row, index) => (
                <tr key={index}>
                    { row.map((col,index) => (
                        <td key={index}>
                            {col}
                        </td>
                    )) }
                </tr>
            )) }
            </tbody>
        </table>
    </div>
);

// props = { className, data, headers }
class GrammarQuizTable extends React.Component {
    constructor(props) {
        super(props);

        const partialState = {
            className: props.className,
            headers: props.headers
        };

        partialState.inputData = Object.create(props.data);
        partialState.inputData.table = partialState.inputData.table.map((row, rowIndex) => (
            row.map((col, index) => (
                index === 0 ? col : <input key={index}
                                           className="form-control"
                                           type="text"
                                           onChange={this.handleChange}
                                           placeholder={col} />
            ))
        ));

        this.state = partialState;

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.target.value = event.target.value.toLocaleLowerCase();
        const desiredClass = (event.target.value === event.target.placeholder) ? 'correct' : 'incorrect';
        const hasCorrectClassName = event.target.className.indexOf(` ${desiredClass}`) >= 0;
        if (!hasCorrectClassName && event.target.value !== '') {
            const wrongClass = (desiredClass === 'correct') ? 'incorrect' : 'correct';
            if (event.target.className.indexOf(wrongClass) >= 0) {
                event.target.className = event.target.className.split(wrongClass).join('');
            }
            event.target.className += ` ${desiredClass}`;
        } else if (event.target.value === '') {
            event.target.className = event.target.className.split(/(?:in)?correct/).join('');
        }
    }

    render() {
        return (
            <GrammarTable className={this.state.className}
                          data={this.state.inputData}
                          headers={this.state.headers} />
        );
    }
}

// props = { title, data, headers, makeKey (optional) }
const GrammarInfo = props => (
    <div className="row">
        <h3>{ props.title }</h3>
        { props.data.map((data, index) =>
            (<GrammarQuizTable className="col-md-4"
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
        <GrammarInfo title={ props.conjugation.name + '(' + props.conjugation.theme + ')' }
                 data={props.conjugation.data}
                 headers={ ['Person', 'Sg.', 'Pl.'] }
                 makeKey={makeConjugationKey} />
    );
};

// props = { declension }
const Declension = props => {
    const makeDeclensionKey = data => data.name + ' ' + data.gender;
    return (
        <GrammarInfo title={props.declension.name}
                 data={props.declension.data}
                 headers={ [ 'Case', 'Sg.', 'Pl.' ] }
                 makeKey={makeDeclensionKey} />
    );
};

// props = { conjugations, declensions }
const Grammar = props => (
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

export { Grammar };
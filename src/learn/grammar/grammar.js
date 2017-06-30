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

class QuizInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = { answer: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps (props) {
        console.log('In QuizInput');
        console.log(props);
        if (props.answer !== this.props.answer) {
            this.setState({ answer: '' });
        }
    }

    handleChange (event) {
        this.setState({ answer: event.target.value.toLocaleLowerCase() });

        const answer = event.target.value.toLocaleLowerCase();
        const correct = this.props.correctClass;
        const incorrect = this.props.incorrectClass;
        const desiredClass = (answer === this.props.answer) ? correct : incorrect;
        const hasCorrectClassName = event.target.className.indexOf(` ${desiredClass}`) >= 0;
        // If the input is not colored to match the correctness of the input, remove the incorrect class,
        // if present, and append the correct class.
        // Otherwise, when it is '', it should be the default color to indicate it has not been attempted
        // or that it has been reset, so remove any correctness classes (i.e. remove both correct & incorrect).
        if (!hasCorrectClassName && answer !== '') {
            const wrongClass = (desiredClass === correct) ? incorrect : correct;
            if (event.target.className.indexOf(wrongClass) >= 0) {
                event.target.className = event.target.className.split(wrongClass).join('');
            }
            event.target.className += ` ${desiredClass}`;
        } else if (answer === '') {
            event.target.className = event.target.className.split(correct).join('').split(incorrect).join('');
        }

        // If the value is correct, call the callback for a correct answer.
        if (this.props.onChange) {
            this.props.onChange(answer === this.props.answer);
        }
    }

    render () {
        return (
            <input className={this.props.className}
                   type="text"
                   size={this.props.size}
                   value={this.state.answer}
                   onChange={this.handleChange}
                   placeholder={this.props.placeholder} />
        );
    }
}

// props = { className, data, headers }
class GrammarQuizTable extends React.Component {
    constructor (props) {
        super(props);

        const partialState = {
            className: props.className,
            headers: props.headers
        };

        partialState.inputData = Object.create(props.data);
        partialState.inputData.table = partialState.inputData.table.map((row, rowIndex) => (
            row.map((col, index) => (
                index === 0 ? col : <QuizInput key={index}
                                               className="form-control"
                                               placeholder={col}
                                               correctClass="correct"
                                               incorrectClass="incorrect" />
            ))
        ));

        this.state = partialState;
    }

    render () {
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
        <GrammarInfo title={ `${props.conjugation.name} Conjugation` +
        (props.conjugation.theme ? '(' + props.conjugation.theme + ')' : '') }
                 data={props.conjugation.data}
                 headers={ ['Person', 'Sg.', 'Pl.'] }
                 makeKey={makeConjugationKey} />
    );
};

// props = { declension }
const Declension = props => {
    const makeDeclensionKey = data => data.name + ' ' + data.gender;
    return (
        <GrammarInfo title={props.declension.name + ' Declension'}
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
            {props.conjugations.filter(x => x !== undefined).map(conjugation => (
                <Conjugation key={conjugation.name} conjugation={conjugation} />
            ))}
            {props.declensions.filter(x => x !== undefined).map(declension => (
                <Declension key={declension.name} declension={declension} />
            ))}
        </div>
    </div>
);

export { Grammar, GrammarTable, QuizInput };
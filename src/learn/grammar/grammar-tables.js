import React from 'react';

const GrammarTable = ({ className, data: { tense, mood, voice, table }, headers }) => (
    <div className={ className }>
        <h4>{ tense } { mood } { voice }</h4>
        <table className="table">
            <thead className="thead">
            <tr>{ headers.map((n, index) => <th key={index}>{ n }</th>) }</tr>
            </thead>
            <tbody>
            { table.map((row, index) => (
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

class QuizInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = { answer: '', className: this.props.className || '' };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps ({ answer, className }) {
        if (answer !== this.props.answer) {
            this.setState({ answer: '', className: className || '' });
        }
    }

    // TODO: Correct bug where colors do not change in inputs.
    handleChange (event) {
        const { correct, incorrect, answer } = this.props;
        const guess = event.target.value.toLocaleLowerCase();
        let className = event.target.className || '';

        // If the input is not colored to match the correctness of the input, remove the incorrect class,
        // if present, and append the correct class.
        // Otherwise, when it is '', it should be the default color to indicate it has not been attempted
        // or that it has been reset, so remove any correctness classes (i.e. remove both correct & incorrect).
        const desiredClass = (guess === answer) ? correct : incorrect;
        if (!className.includes(` ${desiredClass}`) && guess !== '') {
            const wrongClass = (desiredClass === correct) ? incorrect : correct;

            // if it contains the wrong class, remove it and append the correct class.
            if (className.includes(` ${wrongClass}`)) {
                className = className.split(wrongClass).join('');
            }
            className += ` ${desiredClass}`;
        } else if (guess === '') {
            // Remove both correct & incorrect classes.
            className = className.split(correct).join('').split(incorrect).join('');
        }
        console.log(className);
        console.log(guess);

        this.setState({ answer: guess, className });

        // If the value is correct, call the callback for a correct answer.
        if (this.props.onChange) {
            this.props.onChange(guess === answer);
        }
    }

    render () {
        return (
            <input className={this.state.className}
                   type="text"
                   size={this.props.size}
                   value={this.state.answer}
                   onChange={this.handleChange}
                   placeholder={this.props.placeholder} />
        );
    }
}

export { GrammarQuizTable, QuizInput };
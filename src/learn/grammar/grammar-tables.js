import React from 'react';

const GrammarTable = ({
    className,
    data: {
        tense,
        mood,
        voice,
        table
    },
    headers
}) => (
    <div className={ className }>
        <h4>{ tense } { mood } { voice }</h4>
        <table className="table">
            <thead className="thead">
            <tr>{ headers.map((n, index) => <th key={index}>{ n }</th>) }</tr>
            </thead>
            <tbody>
            { table.map((row, index) => (
                <tr key={index}>
                    { row.map((col, index) => (
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
const GrammarQuizTable = ({ className, data, headers }) => {
    const inputData = Object.assign({}, data);
    inputData.table = inputData.table
        .map((row, rowIndex) => (
            row.map((col, index) => (
                index === 0
                    ? col
                    : (<QuizInput key={index}
                                  className="form-control"
                                  placeholder={col}
                                  correctClass="correct"
                                  incorrectClass="incorrect" />)
            ))
        )
    );
    return (
        <GrammarTable className={className}
                        data={inputData}
                        headers={headers} />
    );
};

class QuizInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            answer: '',
            classNames: [ this.props.className || '' ]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps ({ answer, className }) {
        if (answer !== this.props.answer) {
            this.setState({ answer: '', classNames: [ className || '' ] });
        }
    }

    handleChange (event) {
        const {
            correctClass = 'correct',
            incorrectClass = 'incorrect'
        } = this.props;
        const answer = this.props.placeholder;
        const guess = event.target.value.toLocaleLowerCase();

        // If the input is not colored to match the correctness of the input,
        // remove the incorrect class;
        // if present, and append the correct class.
        // Otherwise, when it is '', it should be the default color to indicate
        // it has not been attempted or that it has been reset, so remove any
        // correctness classes (i.e. remove both correct & incorrect).
        const desiredClass = (guess === answer)
                                ? correctClass
                                : incorrectClass;
        const wrongClass = (correctClass === desiredClass)
                                ? incorrectClass
                                : correctClass;

        // If the box is empty, don't mark it as correct or incorrect.
        if (guess === '') {
            this.setState({
                classNames: this.state.classNames
                            .filter(name => name !== correctClass
                                        && name !== incorrectClass)
            });
        // Otherwise, if the desired class is not currently applied, apply it
        // and remove the undesired class.
        } else if (!this.state.classNames.includes(desiredClass)) {
            this.setState({
                classNames: this.state.classNames
                            .filter(name => name !== wrongClass)
                            .concat(desiredClass)
            });
        }

        this.setState({ answer: guess });

        this.props.onChange(guess);
    }

    render () {
        return (
            <input className={this.state.classNames.join(' ')}
                   type="text"
                   size={this.props.size}
                   value={this.state.answer}
                   onChange={this.handleChange}
                   placeholder={this.props.placeholder} />
        );
    }
}

export { GrammarQuizTable, QuizInput };

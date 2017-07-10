import React from 'react';
import './learn.css';
import { QuizInput } from './grammar/grammar.js';
import { Words, WordInfo } from './words.js';

class Quiz extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};

        this.showWordInfo = this.showWordInfo.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    showWordInfo (word, { grammarType, grammar }) {
        const [ conjugation, declension ] = [
            grammarType === 'conjugation' ? grammar : undefined,
            grammarType === 'declension' ? grammar : undefined
        ];
        this.setState({ word, conjugation, declension });
    }

    onChange (correct) {
        this.setState({correct});
        if (correct) {
            this.props.onCorrect();
        }
    }

    componentWillReceiveProps ({ word }) {
        this.setState({ correct: 'false', word: word });
    }

    render () {
        const { card: { anteInput, input, postInput, literalTranslation, idiomaticTranslation }, language } = this.props;
        const { word, conjugation, declension, correct } = this.state;
        return (
            <div>
                <div className="centered">
                    <fieldset>
                        <legend>Latin { correct ? '- Correct!' : '' }</legend>
                        <Words words={anteInput}
                               language={language}
                               onClick={this.showWordInfo} />
                        <QuizInput placeholder=""
                                   answer={input.form}
                                   className="learningQuizInput"
                                   size={input.form.length}
                                   correctClass="correct"
                                   incorrectClass="incorrect"
                                   onChange={this.onChange} />
                        <Words words={postInput}
                               language={language}
                               onClick={this.showWordInfo} />
                        <hr />
                        <table>
                            <thead><tr><th>Translation</th></tr></thead>
                            <tbody>
                                <tr><td>Literal</td><td>{ literalTranslation }</td></tr>
                                <tr><td>Idiomatic</td><td>{ idiomaticTranslation }</td></tr>
                            </tbody>
                        </table>
                    </fieldset>
                </div>

                { word ? (
                    <div>
                        <hr />
                        <WordInfo word={word}
                                  conjugation={conjugation}
                                  declension={declension} />
                    </div>
                ) : null }
            </div>
        );
    }
}

class Learn extends React.Component {
    constructor (props) {
        super(props);
        this.state = { cardIndex: 0 };

        this.nextCard = this.nextCard.bind(this);
    }

    // TODO: Choose next card based on statistical analysis of performance on previous cards.
    nextCard () {
        // TODO: fix bug where, after answering one question, if you click on two words of the same declension,
        // TODO: (continued) the table for their forms shows the first of the two after clicking the second.
        this.setState({ cardIndex: (this.state.cardIndex + 1) % this.props.cards.length });
    }

    render () {
        const { cards, words, language } = this.props;
        return (
            <Quiz card={cards[this.state.cardIndex]}
                  words={words}
                  language={language}
                  onCorrect={this.nextCard} />
        );
    }
}

export { Learn };
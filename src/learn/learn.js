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

    showWordInfo (word, conjugation, declension) {
        this.setState({ word, conjugation, declension });
    }

    onChange (correct) {
        console.log(correct);
        this.setState({correct});
        if (correct) {
            this.props.onCorrect();
        }
    }

    componentWillReceiveProps (props) {
        console.log(props);
        this.setState({ correct: 'false', word: props.word });
    }

    render () {
        return (
            <div>
                <div className="centered">
                    <fieldset>
                        <legend>Latin { this.state.correct ? '- Correct!' : '' }</legend>
                        <Words words={this.props.card.anteInput}
                               onClick={this.showWordInfo}
                               conjugations={this.props.conjugations}
                               declensions={this.props.declensions} />
                        <QuizInput placeholder=""
                                   answer={this.props.card.input.form}
                                   className="learningQuizInput"
                                   size={this.props.card.input.form.length}
                                   correctClass="correct"
                                   incorrectClass="incorrect"
                                   onChange={this.onChange} />
                        <Words words={this.props.card.postInput}
                               onClick={this.showWordInfo}
                               conjugations={this.props.conjugations}
                               declensions={this.props.declensions} />
                        <hr />
                        <table>
                            <thead>
                            <tr>
                                <th>Translation</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Literal</td>
                                <td>{ this.props.card.literalTranslation }</td>
                            </tr>
                            <tr>
                                <td>Idiomatic</td>
                                <td>{ this.props.card.idiomaticTranslation }</td>
                            </tr>
                            </tbody>
                        </table>
                    </fieldset>
                </div>

                { this.state.word ? (
                    <div>
                        <hr />
                        <WordInfo word={this.state.word}
                                  conjugation={this.state.conjugation}
                                  declension={this.state.declension} />
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

    nextCard () {
        // TODO: fix bug where, after answering one question, if you click on two words of the same declension,
        // TODO: (continued) the table for their forms shows the first of the two after clicking the second.
        this.setState({ cardIndex: (this.state.cardIndex + 1) % this.props.cards.length });
    }

    render () {
        return (
            <Quiz card={this.props.cards[this.state.cardIndex]}
                  words={this.props.words}
                  conjugations={this.props.conjugations}
                  declensions={this.props.declensions}
                  onCorrect={this.nextCard} />
        );
    }
}

export { Learn };
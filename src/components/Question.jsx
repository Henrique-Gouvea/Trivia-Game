import './Questions.css';

import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const RANDOM_CHANCE = 0.5;

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedAnswer: false,
      answers: this.shuffleAnswers(),
    };
  }

  shuffleAnswers = () => {
    const { question: { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } } = this.props;
    const answers = [...incorrectAnswers, correctAnswer];
    return answers.sort(() => Math.random() - RANDOM_CHANCE);
  }

  handleAnswerClick = () => {
    this.setState({ isSelectedAnswer: true });
  }

  setClassName = (answer, correct) => {
    const { isSelectedAnswer } = this.state;
    const { time } = this.props;
    if ((isSelectedAnswer) || (time === 0)) {
      if (answer === correct) return 'correct-answer';
      return 'incorrect-answer';
    }
    return 'answer';
  }

  render() {
    const { question, time } = this.props;
    const { answers } = this.state;
    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              type="button"
              disabled={ time === 0 }
              className={ this.setClassName(answer, question.correct_answer) }
              onClick={ this.handleAnswerClick }
              data-testid={
                answer === question.correct_answer
                  ? 'correct-answer' : `wrong-answer-${index}`
              }
              key={ index }
            >
              {answer}
            </button>))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.game.time,
});

Question.propTypes = {
  question: propTypes.objectOf(propTypes.any),
  time: propTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Question);

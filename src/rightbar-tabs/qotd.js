import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../css/qotd.css';

const QuestionOfTheDay = (props) => {
    const [answer, setAnswer] = useState('');
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0!
    const year = String(date.getFullYear()).slice(-2);

    const today = `${month}/${day}/${year}`;

    // Update the answer in the parent component whenever it changes
    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
        props.onAnswerChange(event.target.value);
    };

    return (
        <div>
            <h1 className="right-panel-header">
                {today}: {props.qotd}
            </h1>
            <form
                className="answer-qotd"
            >
                <textarea
                    type="text"
                    name="answer-to-qotd"
                    minLength="20"
                    value={props.alreadyAnswered ? "You've already answered the question of the day" : answer}
                    onChange={handleAnswerChange}
                    disabled={props.alreadyAnswered}
                />
                <div style={{ textAlign: 'left' }}>Character count: {answer.length}</div>
                <div style={{ textAlign: 'left' }}>Please write at least 40 characters.</div>
            </form>
            <Button
                variant="outline-dark"
                className="answer-qotd-btn"
                onClick={() => props.setToExtras('addExtras')}
                disabled={answer.length < 40}
            >
                continue
            </Button>
        </div>

    );
}

export default QuestionOfTheDay;
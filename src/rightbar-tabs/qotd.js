import React from 'react';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import '../css/qotd.css';

const QuestionOfTheDay = (props) => {
    return (
        <div>
            <h1 className="right-panel-header">
                qotd: {props.qotd}
            </h1>
            <form
                className="answer-qotd"
            >
                <textarea
                    type="text"
                    name="answer-to-qotd"
                    minLength="20"
                />
            </form>
            <ArrowRightSquareFill
                className="answer-qotd-btn"
                onClick={() => props.setToExtras('addExtras')}
            />
        </div>
    );
}

export default QuestionOfTheDay;
import { useState } from 'react';
import QuestionOfTheDay from './qotd.js';
import SubmitAnswer from './submit-answer.js';
import './css/rightbar.css';

const RightPanel = (props) => {
    const [answeringQuestion, setAnsweringQuestion] = useState(true);
    const [addingExtras, setAddingExtras] = useState(false);

    return (
        <>
            {props.writingNote &&
                <div className="right-panel-container">
                    <div className="active-panel">
                        {answeringQuestion && <QuestionOfTheDay />}
                        {addingExtras && <SubmitAnswer />}
                    </div>
                    <div className="inactive-panel"
                        onClick={() => setAnsweringQuestion(!answeringQuestion) || setAddingExtras(!addingExtras)}
                    >
                        {answeringQuestion &&
                            <h1 className="right-panel-header">Add finishing touches</h1>
                        }
                        {addingExtras &&
                            <h1 className="right-panel-header">Answer the question of the day</h1>
                        }
                    </div>
                </div>
            }

            {
                props.viewingNote &&
                <div>
                    <h1>View Notes</h1>
                </div>
            }
        </>
    );
}

export default RightPanel;
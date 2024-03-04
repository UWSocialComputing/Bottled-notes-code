import { useState, useEffect } from 'react';
import { Tab, Tabs, Modal, Button } from 'react-bootstrap';
import { addNote, getMatchId, getAnswer } from './api.js';
import QuestionOfTheDay from './rightbar-tabs/qotd.js';
import SubmitAnswer from './rightbar-tabs/submit-answer.js';
import PastNotes from './rightbar-tabs/past-notes.js';
// import Stickerbook from './rightbar-tabs/stickerbook.js';
import TodaysNote from './rightbar-tabs/todays-note.js';
import './css/rightbar.css';

const RightPanel = (props) => {
    const [toExtras, setToExtras] = useState('answerQuestion');
    const [answer, setAnswer] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [myAnswer, setMyAnswer] = useState("");
    const [matchId, setMatchId] = useState(null);
    const [matchAnswer, setMatchAnswer] = useState("");

    const handleTogglePrivate = () => setIsPrivate(!isPrivate);

    const handleFinishingTouches = () => {
        setShowModal(true);
        addNote(props.userId, answer, isPrivate);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        props.setWritingNote(false);
    }

    useEffect(() => {
        const fetchAnswer = async () => {
            const fetchedMatchId = await getMatchId(props.userId);
            const response = await getAnswer(props.userId);
            let matchResponse = null;
            if (fetchedMatchId) {
                matchResponse = await getAnswer(fetchedMatchId);
            }
            setMyAnswer(response.todaysAnswer);
            setIsPrivate(response.isPrivate);
            if (matchResponse) {
                setMatchAnswer(matchResponse.todaysAnswer);
            }
            setMatchId(fetchedMatchId);
        };

        fetchAnswer();
    }, [props.userId]);

    return (
        <>
            <div className="right-panel-container">
                {
                    props.writingNote &&
                    <>
                        <Tabs defaultActiveKey="answerQuestion" variant="pills" activeKey={toExtras} onSelect={(k) => setToExtras(k)}>
                            <Tab eventKey="answerQuestion" title="1. write a note">
                                <div className="active-panel">
                                    <QuestionOfTheDay
                                        setToExtras={setToExtras}
                                        qotd={props.qotd}
                                        onAnswerChange={setAnswer}
                                        alreadyAnswered={myAnswer !== null}
                                    />
                                </div>
                            </Tab>
                            <Tab eventKey="addExtras" title="2. prepare your bottle">
                                <div className="active-panel">
                                    <SubmitAnswer
                                        answer={answer}
                                        setAnswer={setAnswer}
                                        handleFinishingTouches={handleFinishingTouches}
                                        isPrivate={isPrivate}
                                        handleTogglePrivate={handleTogglePrivate}
                                        alreadyAnswered={myAnswer !== null}
                                    />
                                </div>
                            </Tab>
                        </Tabs>
                    </>

                }
                {
                    props.viewingNote &&
                    <Tabs defaultActiveKey="todaysNote" variant="pills">
                        <Tab eventKey="todaysNote" title="today's note">
                            <div className="active-panel">
                                <TodaysNote
                                    myAnswer={myAnswer}
                                    matchAnswer={matchAnswer}
                                    matchId={matchId}
                                    isPrivate={isPrivate}
                                    qotd={props.qotd}
                                    userId={props.userId}
                                />
                            </div>
                        </Tab>
                        <Tab eventKey="pastNotes" title="past questions">
                            <div className="active-panel">
                                <PastNotes
                                    pastNotes={props.pastNotes}
                                />
                            </div>
                        </Tab>
                        {/* <Tab eventKey="stickerbook" title="stickerbook">
                            <div className="active-panel">
                                <Stickerbook />
                            </div>
                        </Tab> */}
                    </Tabs>
                }
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>You've dropped your bottle into the sea.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isPrivate && <p>Your note is private. You can view it under the "View notes" option on the left sidebar.</p>}
                    {!isPrivate && <p>Your answer will go to a stranger on the internet. You'll be able to see your match's answer too! Check back in a while to see if you've received a note from someone.</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RightPanel;
import { React, useContext, useState } from 'react';
import { Tab, Tabs, Modal, Button } from 'react-bootstrap';
import { UserContext } from './usercontext';
import { addNote } from './api.js';
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
    const { userId } = useContext(UserContext);

    const handleTogglePrivate = () => setIsPrivate(!isPrivate);

    const handleFinishingTouches = () => {
        setShowModal(true);
        addNote(userId, answer, isPrivate);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        props.setWritingNote(false);
    }

    return (
        <>
            <div className="right-panel-container">
                {
                    props.writingNote &&
                    <Tabs defaultActiveKey="answerQuestion" variant="pills" activeKey={toExtras} onSelect={(k) => setToExtras(k)}>
                        <Tab eventKey="answerQuestion" title="write a note">
                            <div className="active-panel">
                                <QuestionOfTheDay
                                    setToExtras={setToExtras}
                                    qotd={props.qotd}
                                    onAnswerChange={setAnswer}
                                />
                            </div>
                        </Tab>
                        <Tab eventKey="addExtras" title="prepare your bottle">
                            <div className="active-panel">
                                <SubmitAnswer
                                    answer={answer}
                                    setAnswer={setAnswer}
                                    handleFinishingTouches={handleFinishingTouches}
                                    isPrivate={isPrivate}
                                    handleTogglePrivate={handleTogglePrivate}
                                />
                            </div>
                        </Tab>
                    </Tabs>
                }
                {
                    props.viewingNote &&
                    <Tabs defaultActiveKey="todaysNote" variant="pills">
                        <Tab eventKey="todaysNote" title="today's note">
                            <div className="active-panel">
                                <TodaysNote
                                    qotd={props.qotd}
                                />
                            </div>
                        </Tab>
                        <Tab eventKey="pastNotes" title="past notes">
                            <div className="active-panel">
                                <PastNotes />
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
                    {isPrivate && <p>Your note is private.</p>}
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
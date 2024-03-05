import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SplineIsland from './spline.js';
import ViewWriteButton from './view-button.js';
import RightPanel from './right-panel.js';
import { ArrowLeftCircleFill, ChatHeartFill, QuestionCircle } from 'react-bootstrap-icons';
import { getQotd, fetchPastNotes } from './api.js';
import { UserContext } from './usercontext';
import './css/home.css';

const Home = (props) => {
    const { userId } = useContext(UserContext);
    const [writingNote, setWritingNote] = useState(true);
    const [viewingNote, setViewingNote] = useState(false);
    const [qotd, setQotd] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [pastNotes, setPastNotes] = useState([]);
    const [showHelpModal, setShowHelpModal] = useState(false);

    const startDate = new Date('2024-02-26');
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((startDate - today) / oneDay)) + 1;


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer); // This will clear the timer when the component unmounts
    }, []);

    useEffect(() => {
        const fetchQotd = async () => {
            if (qotd === "") {
                const response = await getQotd(diffDays);
                setQotd(response);
            }
        };

        fetchQotd();
        console.log(userId);
    }, [qotd, userId, diffDays]);

    useEffect(() => {
        const fetchNotes = async () => {
            const notes = await fetchPastNotes(diffDays);
            setPastNotes(notes);
        };

        fetchNotes();
    }, [diffDays]);

    return (
        <>
            <div className="home-page">
                {(writingNote || viewingNote) && <ArrowLeftCircleFill
                    className="back-btn"
                    onClick={() => setWritingNote(false) || setViewingNote(false)}
                />}
                <ViewWriteButton
                    onViewClick={() => {
                        setViewingNote(true);
                        setWritingNote(false);
                    }}
                    onWriteClick={() => {
                        setWritingNote(true);
                        setViewingNote(false);
                    }}
                    viewingNote={viewingNote}
                    writingNote={writingNote}
                />
                {(writingNote || viewingNote) && <RightPanel
                    writingNote={writingNote}
                    viewingNote={viewingNote}
                    setWritingNote={setWritingNote}
                    qotd={qotd}
                    userId={userId}
                    pastNotes={pastNotes}
                />}
                <Button className="logo" variant="outline" onClick={() => setShowHelpModal(true)}>
                    bottled notes
                    <ChatHeartFill className="logo-icon"/>
                </Button>
                <Button variant="link" className="help-button" onClick={() => setShowHelpModal(true)}>
                    <QuestionCircle
                        size={30}
                        color="black"
                    />
                </Button>
                <SplineIsland />
                {isLoading && (
                    <div style={{
                        fontSize: '80px',
                        zIndex: 9999,
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                        Loading...
                    </div>
                )}


                {/* temporary button to upload qotd */}
                {/* <Button onClick={() => {
                    console.log("clicked the upload button");
                    uploadData();
                }}>
                    TEMPORARY BUTTON
                </Button> */}
            </div>
            <Modal show={showHelpModal} onHide={() => setShowHelpModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Help</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Every day at 12AM PT, you'll get a new question of the day. Answer the question, and you can choose to have it get sent to a stranger on the internet. You'll receive the stranger's response to the question in return. Then, you can chat with the stranger if you wish. Random matching will happen within a few minutes to a few hours, so check back if you haven't received a stranger's note yet!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={() => setShowHelpModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home;
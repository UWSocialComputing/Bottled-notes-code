import React, { useState, useEffect, useContext } from 'react';
import SplineIsland from './spline.js';
import ViewButton from './view-button.js';
import WriteButton from './write-button.js';
import RightPanel from './right-panel.js';
import { ArrowLeftCircleFill, ChatHeartFill } from 'react-bootstrap-icons';
import { getQotd } from './api.js';
import { UserContext } from './usercontext';
import './css/home.css';

const Home = (props) => {
    const { userId } = useContext(UserContext);
    const [writingNote, setWritingNote] = useState(false);
    const [viewingNote, setViewingNote] = useState(false);
    const [qotd, setQotd] = useState("");

    useEffect(() => {
        const fetchQotd = async () => {
            if (qotd === "") {
                const startDate = new Date('2024-02-26');
                const today = new Date();
                const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                const diffDays = Math.round(Math.abs((startDate - today) / oneDay)) + 1;

                const response = await getQotd(diffDays);
                setQotd(response);
            }
        };

        fetchQotd();
        // console.log(userId);
    }, [qotd]);

    return (
        <>
            <div className="home-page">
                {(writingNote || viewingNote) && <ArrowLeftCircleFill
                    className="back-btn"
                    onClick={() => setWritingNote(false) || setViewingNote(false)}
                />}
                {!viewingNote && <WriteButton
                    onClick={() => setWritingNote(!writingNote)}
                    writingNote={writingNote}
                />}
                {!writingNote && <ViewButton
                    onClick={() => setViewingNote(!viewingNote)}
                    viewingNote={viewingNote}
                />}
                {(writingNote || viewingNote) && <RightPanel
                    writingNote={writingNote}
                    viewingNote={viewingNote}
                    setWritingNote={setWritingNote}
                    qotd={qotd}
                    userId={userId}
                />}
                <div className="logo">
                    bottled notes
                    <ChatHeartFill className="logo-icon" />
                </div>
                <SplineIsland className="spline-center" />
                <div style={{
                    height: '100vh',
                    fontSize: '80px'
                }}>
                    Loading...
                </div>


                {/* temporary button to upload qotd */}
                {/* <Button onClick={() => {
                    console.log("clicked the upload button");
                    uploadData();
                }}>
                    TEMPORARY BUTTON
                </Button> */}
            </div>
        </>
    );
}

export default Home;
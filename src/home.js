import React, { useState } from 'react';
import SplineIsland from './spline.js';
import ViewButton from './view-button.js';
import WriteButton from './write-button.js';
import RightPanel from './right-panel.js';
import { ArrowLeftCircleFill, ChatHeartFill } from 'react-bootstrap-icons';
import './css/home.css';


const Home = () => {
    const [writingNote, setWritingNote] = useState(false);
    const [viewingNote, setViewingNote] = useState(false);

    const qotd = "if you had to build a roof out of any vegetable, what would you build it out of and why?";

    return (
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
                qotd={qotd}
            />}
            <div className="logo">
                bottled notes
                <ChatHeartFill className="logo-icon" />
            </div>
            <SplineIsland />
        </div>
    );
}

export default Home;
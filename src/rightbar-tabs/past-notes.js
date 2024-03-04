import React from "react";
import "../css/past-notes.css";

const PastNotes = (props) => {


    return (
        <div>
            <h1 className="right-panel-header">past questions</h1>
            <p className="past-notes">
                {props.pastNotes.map((note, index) => {
                    return (
                        <div className="past-notes-box">
                            <div key={index}>
                                {note.question}
                            </div>
                        </div>
                    );
                })}
            </p>
        </div>
    );
}


export default PastNotes;
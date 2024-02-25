import React from "react";
import "../css/todays-note.css";

const TodaysNote = (props) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0!
    const year = String(date.getFullYear()).slice(-2);

    const today = `${month}/${day}/${year}`;

    return (
        <div>
            <h1 className="right-panel-header">today's note</h1>
            <h2 className="todays-note-header">
                <span className="todays-date">
                    {today}: {props.qotd}
                </span>
            </h2>
            <p className="todays-note">
            </p>
        </div>
    );
}

export default TodaysNote;
import { React, useState, useEffect } from "react";
import { getAnswer } from "../api.js";
import "../css/todays-note.css";

const TodaysNote = (props) => {
    const [myAnswer, setMyAnswer] = useState("");
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0!
    const year = String(date.getFullYear()).slice(-2);

    const today = `${month}/${day}/${year}`;

    useEffect(() => {
        const fetchAnswer = async () => {
            const response = await getAnswer(props.userId);
            setMyAnswer(response);
        };

        fetchAnswer();
        console.log(myAnswer);
    }, [props.userId]);


    return (
        <div>
            <h1 className="right-panel-header">today's note</h1>
            <h2 className="todays-note-header">
                <span className="todays-date">
                    {today}: {props.qotd}
                </span>
            </h2>
            <p className="todays-note">
                {myAnswer === null ? "You haven't answered today's question!" : myAnswer}
            </p>
        </div>
    );
}

export default TodaysNote;
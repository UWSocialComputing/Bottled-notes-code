import { useState, useEffect } from "react";
import { getAnswer, getMatchId } from "../api.js";
import "../css/todays-note.css";

const TodaysNote = (props) => {
    const [myAnswer, setMyAnswer] = useState("");
    const [matchAnswer, setMatchAnswer] = useState("");

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0!
    const year = String(date.getFullYear()).slice(-2);

    const today = `${month}/${day}/${year}`;

    useEffect(() => {
        const fetchAnswer = async () => {
            const matchId = await getMatchId(props.userId);
            const response = await getAnswer(props.userId);
            let matchResponse = null;
            if (matchId) {
                matchResponse = await getAnswer(matchId);
            }
            setMyAnswer(response);
            setMatchAnswer(matchResponse);
        };

        fetchAnswer();
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
                Your answer: {myAnswer === null ? "You haven't answered today's question!" : myAnswer}
            </p>

            <p className="todays-note">
                {matchAnswer === null ? "Come back later to see a stranger's answer to the question!" : `A stranger said: ${matchAnswer}`}
            </p>

            <p className="todays-note">

            </p>
        </div>
    );
}

export default TodaysNote;
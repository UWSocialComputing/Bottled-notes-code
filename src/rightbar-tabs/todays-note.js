import { useState, useEffect } from "react";
import { getAnswer, getMatchId } from "../api.js";
import Chat from '../chat.js';
import "../css/todays-note.css";

const TodaysNote = (props) => {
    const [myAnswer, setMyAnswer] = useState("");
    const [matchAnswer, setMatchAnswer] = useState("");
    const [matchId, setMatchId] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0!
    const year = String(date.getFullYear()).slice(-2);

    const today = `${month}/${day}/${year}`;

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

            {!isPrivate && (
                <p className="todays-note">
                    {matchAnswer === null ? "Come back later to see a stranger's answer to the question!" : `A stranger said: ${matchAnswer}`}
                </p>
            )}
            {matchAnswer !== null && matchId && <Chat matchId={matchId} />}
        </div>
    );
}

export default TodaysNote;
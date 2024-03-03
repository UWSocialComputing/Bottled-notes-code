import Chat from '../chat.js';
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
                Your answer: {props.myAnswer === null ? "You haven't answered today's question!" : props.myAnswer}
            </p>

            {!props.isPrivate && (
                <p className="todays-note">
                    {props.matchAnswer === null || props.matchAnswer === "" ? "Come back later to see a stranger's answer to the question!" : `A stranger said: ${props.matchAnswer}`}
                </p>
            )}
            {props.matchAnswer !== null && props.matchId && <Chat matchId={props.matchId} />}
        </div>
    );
}

export default TodaysNote;
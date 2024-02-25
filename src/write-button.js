import { Button } from 'react-bootstrap';
import './css/write-button.css';

const WriteButton = (props) => {
    return (
        <div className="write-notes-btn">
            <Button
                variant="outline-dark"
                onClick={props.onClick}
                className={props.writingNote ? 'active-btn' : ''}
            >
                {props.writingNote ? "writing a note..." : "write a note"}
            </Button>
        </div>
    );
}

export default WriteButton;
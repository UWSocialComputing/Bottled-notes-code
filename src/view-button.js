import { Button } from 'react-bootstrap';
import './css/view-button.css';

const ViewButton = (props) => {
    return (
        <div className="view-notes-btn">
            <Button
                variant="outline-dark"
                onClick={props.onClick}
                className={props.viewingNote ? 'active-btn' : ''}
            >
                {props.viewingNote ? "viewing your notes..." : "view notes"}
            </Button>
        </div>
    );
}

export default ViewButton;
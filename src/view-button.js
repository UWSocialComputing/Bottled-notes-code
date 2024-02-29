import { ListGroup } from 'react-bootstrap';
import './css/view-button.css';

const ViewWriteButton = (props) => {
    return (
        <div className="view-notes-btn">
            <ListGroup>
                <ListGroup.Item action onClick={props.onWriteClick} active={props.writingNote}>
                    write a note
                </ListGroup.Item>
                <ListGroup.Item action onClick={props.onViewClick} active={props.viewingNote}>
                    view notes
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default ViewWriteButton;
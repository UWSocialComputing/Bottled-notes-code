import {Button} from 'react-bootstrap';
import './css/rightbar.css';

const RightPanel = (props) => {
    return (
        <div className="right-panel">
            <h1>Right Panel</h1>
            <Button variant="outline-dark">Submit</Button>
        </div>
    );
}

export default RightPanel;
import { Button, ToggleButton, ToggleButtonGroup, Row, Col } from 'react-bootstrap';
import '../css/submit-answer.css';

const SubmitAnswer = (props) => {
    return (
        <>
            <div>
                <h1 className="right-panel-header">adding finishing touches...</h1>
            </div>
            <Row className="mt-3">
                <Col>
                    <p>Keep your note public or private to strangers.</p>
                    <ToggleButtonGroup
                        type="radio"
                        name="options"
                        value={props.isPrivate}
                        onChange={props.handleTogglePrivate}
                        className="my-toggle-button-group"
                    >
                        <ToggleButton id="toggle-public" value={false} variant="outline-dark">
                            Public
                        </ToggleButton>
                        <ToggleButton id="toggle-private" value={true} variant="outline-dark">
                            Private
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Button
                        variant="outline-dark"
                        onClick={props.handleFinishingTouches}
                    >
                        drop your bottle into the sea
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default SubmitAnswer;
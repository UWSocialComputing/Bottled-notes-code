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
                    {props.alreadyAnswered ? (
                        <p>You've already answered the question of the day.</p>
                    ) : (
                        <>
                            <p>choose "private" if you want to keep your note private to strangers.</p>
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
                        </>
                    )}
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <p>note that once you submit an answer, you won't be able to resubmit or edit it.</p>
                    <img
                        src="/bottle.png"
                        alt="a bottle with a note in it" 
                        className="bottle-image"
                    />
                    <Button
                        variant="outline-dark"
                        onClick={props.handleFinishingTouches}
                        disabled={props.alreadyAnswered || props.answer.length < 40}
                    >
                        drop your bottle into the sea
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default SubmitAnswer;
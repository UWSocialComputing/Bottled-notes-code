import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';


const SignInCard = (props) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Enter your username and password to access your island.
                </Card.Title>
                <div>
                    <Form
                        onSubmit={(e) => props.handleFormSubmit(e, props.navigate)}
                    >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                required
                                type="text"
                                placeholder="username"
                                autoComplete="off"
                                value={props.userInfo[0]}
                                onChange={(e) => {
                                    const updatedInfo = [...props.userInfo]
                                    updatedInfo[0] = e.target.value
                                    props.setUserInfo(updatedInfo)
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                required
                                type="text"
                                placeholder="password"
                                autoComplete="off"
                                value={props.userInfo[1]}
                                onChange={(e) => {
                                    const updatedInfo = [...props.userInfo]
                                    updatedInfo[1] = e.target.value
                                    props.setUserInfo(updatedInfo)
                                }} />
                        </Form.Group>
                        <Button variant="outline-dark" type="submit">
                            Enter your island
                        </Button>
                    </Form>
                </div>
            </Card.Body>
        </Card>
    );
}

export default SignInCard;
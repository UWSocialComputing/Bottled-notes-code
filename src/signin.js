import { React, useContext, useState } from "react";
import "./css/signin.css";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { signInUser } from "./api";
import SignInSpline from "./spline2.js";
import { UserContext } from './usercontext';

const SignIn = (props) => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(["", ""]);
    const { setUserId } = useContext(UserContext);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const userCredentials = {
            email: userInfo[0],
            password: userInfo[1]
        }
        const result = await signInUser(userCredentials);

        if (result.error !== undefined) {
            console.log(result.error);
        } else {
            setUserId(result.userId);
            navigate('/home');
        }
    }

    return (

        <Row style={{ display: 'flex', height: '100vh' }}>
            <Col style={{ flex: 1 }}>
                <div className="sign-in-form">
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Enter your username and password to access your island.
                            </Card.Title>
                            <Card.Text>
                                <Form
                                    onSubmit={(e) => handleFormSubmit(e, navigate)}
                                >
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="username"
                                            autocomplete="off"
                                            value={userInfo[0]}
                                            onChange={(e) => {
                                                const updatedInfo = [...userInfo]
                                                updatedInfo[0] = e.target.value
                                                setUserInfo(updatedInfo)
                                            }} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="password"
                                            autoComplete="off"
                                            value={userInfo[1]}
                                            onChange={(e) => {
                                                const updatedInfo = [...userInfo]
                                                updatedInfo[1] = e.target.value
                                                setUserInfo(updatedInfo)
                                            }} />
                                    </Form.Group>
                                    <Button variant="outline-dark" type="submit">
                                        Enter your island
                                    </Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
            <Col style={{ flex: 1 }}>
                <SignInSpline />
            </Col>
        </Row>

    );

}

export default SignIn;
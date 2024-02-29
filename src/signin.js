import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Alert, Button } from "react-bootstrap";
import { signInUser } from "./api";
import SignInSpline from "./spline2.js";
import { UserContext } from './usercontext';
import { ChatHeartFill } from 'react-bootstrap-icons';
import SignInCard from './signincard.js';
import SignUpCard from './signup.js';
import "./css/signin.css";

const SignIn = (props) => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(["", ""]);
    const [error, setError] = useState(null);
    const { setUserId } = useContext(UserContext);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const userCredentials = {
            email: `${userInfo[0]}@fakeemail.com`, // Append the fake email domain
            password: userInfo[1]
        }
        const result = await signInUser(userCredentials);

        if (result.error !== undefined) {
            setError(result.error);
        } else {
            setUserId(result.userId);
            navigate('/home');
        }
    }

    return (
        <Row style={{ display: 'flex', height: '100vh' }}>
            <Col style={{ flex: 1 }}>
                <div className="sign-in-form">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Row>
                        {isSigningUp ? (
                            <SignUpCard
                            // Pass necessary props to SignUpCard
                            />
                        ) : (
                            <SignInCard
                                handleFormSubmit={handleFormSubmit}
                                userInfo={userInfo}
                                setUserInfo={setUserInfo}
                                error={error}
                                navigate={navigate}
                            />
                        )}
                        <Button variant="link" onClick={() => setIsSigningUp(!isSigningUp)}>
                            {isSigningUp ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
                        </Button>
                    </Row>
                    <Row>
                        <div className="logo-sign">
                            bottled notes
                            <ChatHeartFill className="logo-icon" />
                        </div>
                    </Row>
                </div>
            </Col>
            <Col style={{ flex: 1 }}>
                <SignInSpline />
            </Col>
        </Row >
    );
}

export default SignIn;
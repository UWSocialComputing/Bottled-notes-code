import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from './firebase.js';
import { UserContext } from './usercontext';

const SignUpCard = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { setUserId } = useContext(UserContext);

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            const auth = getAuth();
            const email = `${username}@fakeemail.com`;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            // Create a new document in the "users" collection with the user's ID
            await setDoc(doc(db, "users", userId), {
                alreadyMatched: false,
                answeredToday: false,
                isPrivate: false,
                todaysAnswer: null,
                todaysMatchId: null,
                todaysRandom: Math.floor(Math.random() * 1000) + 1,
            });

            setUserId(userId);

            navigate('/home');
        } catch (error) {
            setError(error.message); // Set the error message
        }
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Create an account.
                </Card.Title>
                <p>
                    btw I can't guarantee the safety of this information.
                    also, please use alphanumeric characters only.
                </p>
                <Form onSubmit={handleSignUp}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="outline-dark" type="submit" style={{ marginTop: "20px" }}>
                        Sign Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default SignUpCard;
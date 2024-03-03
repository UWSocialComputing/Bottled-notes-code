import React, { useState, useEffect, useContext, useRef } from 'react';
import { sendMessage } from './api.js';
import { UserContext } from './usercontext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import './css/chat.css';

const Chat = ({ matchId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { userId } = useContext(UserContext);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const docRef = doc(db, "chats", matchId);

        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const sortedMessages = doc.data().messages.sort((a, b) => a.timestamp - b.timestamp);
                setMessages(sortedMessages);
            } else {
                console.log("No such document!");
            }
        });

        return () => unsubscribe();
    }, [matchId]);

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    const handleSend = async (e) => {
        e && e.preventDefault();
        await sendMessage(matchId, newMessage, userId);
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <h2 className="chat-header">Chat with the stranger</h2>
            <div className="message-container" ref={chatContainerRef}>
                {messages.map((message, index) => (
                    <p key={index} className={`message ${message.senderId === userId ? 'current-user' : 'other-user'}`}>
                        {message.text}
                    </p>
                ))}
            </div>
            <div className="input-container">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
                    placeholder="Type a message"
                    className="input-field"
                />
                <button onClick={handleSend} className="send-button">Send</button>
            </div>
        </div>
    );
};

export default Chat;
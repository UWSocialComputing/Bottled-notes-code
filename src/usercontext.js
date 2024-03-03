import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(sessionStorage.getItem('userId') || null);

    useEffect(() => {
        sessionStorage.setItem('userId', userId);
    }, [userId]);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};
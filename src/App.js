import './css/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './about.js';
import Home from './home.js';
import SignIn from './signin.js';
import SignUp from './signup.js';
import { UserProvider } from './usercontext';
import { useState } from 'react';

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <UserProvider value={{ userId, setUserId }}>
    <div className="App">
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </main>
    </div>
    </UserProvider>
  );
}

export default App;
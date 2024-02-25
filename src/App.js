import './css/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './about.js';
import Home from './home.js';

function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
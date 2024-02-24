import SplineIsland from './spline.js';
import RightPanel from './right-panel.js';
import './css/home.css';

const Home = () => {
    return (
        <div className="home-page">
            <RightPanel />
            <SplineIsland />
        </div>
    );
}

export default Home;
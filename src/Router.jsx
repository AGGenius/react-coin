import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Root from "./components/Root";
import Home from "./components/Home";
import Coin from "./components/Coin";
import Favorites from "./components/Favorites";
import './assets/css/Routes.css'

function RoutesApp() {
    return (
      <Router>
        {<Root/>}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:id" element={<Coin />} />
            <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    );
  }
  
  export default RoutesApp;
  
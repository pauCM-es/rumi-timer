import { Route, BrowserRouter, Routes } from "react-router-dom";
import './App.css';
import Landing from "./pages/landing/Landing";
import GameSettings from "./pages/game-settings/GameSettings";
import Timer from "./pages/timer/Timer";
import ScoreBoard from "./pages/score-board/ScoreBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Landing /> } />
        <Route path="/settings" element={ <GameSettings /> } />
        <Route path="/timer" element={ <Timer /> } />
        <Route path="/score-board" element={ <ScoreBoard /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

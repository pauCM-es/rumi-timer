import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlayerAddScore from "../../components/PlayerAddScore";
import PlayerList from "../../components/PlayerList";
import { nextMatch } from "../../redux/game/game.action";

const ScoreBoard = () => {
  const { matchId, potReward, scoresLog } = useSelector((state) => state.game);
  const { playerList } = useSelector((state) => state.players);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playerScoring, setPlayerScoring] = useState("");
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    playerList.forEach((player) => {
      player.isAlive &&
        player.score > highestScore &&
        setHighestScore(player.score);
    });
  }, [playerList]);


  return (
    <section className="h-full w-screen bg-slate-100">
      {/* --------------------- MODAL --------------------------- */}
      {modalIsOpen && (
        <PlayerAddScore
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          player={playerScoring}
          highestScore={highestScore}
        ></PlayerAddScore>
      )}
      {/* --------------------- NAVBAR --------------------------- */}
      <div className="bg-teal-700 py-5 mb-3 text-white">
        <h2 className="font-bold text-4xl text-center">SCOREBOARD</h2>
        <h3 className="text-black font-bold text-lg text-center"> Match {matchId}</h3>
      </div>
      {/* --------------------- PLAYERLIST --------------------------- */}
      <PlayerList
        addListClasses="flex-wrap gap-y-5"
        buttonText="ADD SCORE"
        btnClass="border border-slate-700 rounded-md p-1 mt-2 text-sm hover:bg-yellow-400"
        btnAction={(player) => {
          setPlayerScoring(player);
          setModalIsOpen(true);
        }}
      ></PlayerList>
      {/* --------------------- POT & BTN --------------------------- */}
      <section className="flex justify-center gap-12 my-5">
        <div className="flex-col-center">
          <img
            src="./assets/icons/money-bag.svg"
            alt="money bag icon"
            className="w-12"
          />
          <p className="text-xl font-bold">
            {potReward < 100
              ? `0,${potReward}€ `
              : `${Math.floor(potReward / 100)},${potReward % 100}€`}
          </p>
        </div>
        <Link to={playerList.length === scoresLog.length ? "/timer" : "/score-board"} className=" flex justify-center items-center">
          <button
            onClick={() => {
              playerList.length === scoresLog.length && nextMatch();
            }}
            className="bg-slate-700 text-white text-2xl border-2 border-white rounded-lg px-3 py-1 h-12"
          >
            NEXT MATCH
          </button>
        </Link>
      </section>
    </section>
  );
};

export default ScoreBoard;

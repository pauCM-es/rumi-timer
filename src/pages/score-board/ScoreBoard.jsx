import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlayerAddScore from "../../components/PlayerAddScore";
import PlayerList from "../../components/PlayerList";
import { nextMatch } from "../../redux/game/game.action";

const ScoreBoard = () => {
  const { lifePrice, matchId, potReward } = useSelector((state) => state.game);
  const { playerList } = useSelector((state) => state.players);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playerScoring, setPlayerScoring] = useState("");
  const [highestScore, setHighestScore] = useState(0);
  const [scoresLog, setScoresLog] = useState([3]);

  useEffect(() => {
    playerList.forEach((player) => {
      player.isAlive &&
        player.score > highestScore &&
        setHighestScore(player.score);
    });
  }, [playerList]);

  return (
    <>
      {modalIsOpen && (
        <PlayerAddScore
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          player={playerScoring}
          highestScore={highestScore}
        ></PlayerAddScore>
      )}
      <div className=" py-5">
        <h2 className="font-bold text-4xl text-center">SCOREBOARD</h2>
        <h3 className="text-center"> Match number: {matchId}</h3>
      </div>

      <PlayerList
        addListClasses="flex-wrap justify-around gap-y-5"
        buttonText="ADD SCORE"
        btnClass="border border-slate-700 rounded-md p-1 mt-2 text-sm hover:bg-yellow-400"
        btnAction={(player) => {
          setPlayerScoring(player);
          setModalIsOpen(true);
        }}
      ></PlayerList>
      <section className="flex justify-center gap-12 my-5">
        <div >
          <img
            src="./assets/icons/money-bag.svg"
            alt="money bag icon"
            className="w-12"
          />
          POT:{" "}
          {potReward < 100
            ? `0,${potReward}`
            : `${Math.floor(potReward / 100)},${potReward % 100}`}
        </div>
        <Link to="/timer" className=" flex justify-center items-center">
          <button
            onClick={() => {
              nextMatch();
            }}
            className="bg-slate-700 text-white text-2xl border-2 border-white rounded-lg px-3 py-1 h-12"
          >
            NEXT MATCH
          </button>
        </Link>
      </section>
    </>
  );
};

export default ScoreBoard;

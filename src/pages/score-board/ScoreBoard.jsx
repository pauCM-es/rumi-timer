import React, { useState } from "react";
import { useSelector } from "react-redux";
import PlayerAddScore from "../../components/PlayerAddScore";
import PlayerList from "../../components/PlayerList";

const ScoreBoard = () => {
  // const { turnTime, lifePrice } = useSelector((state) => state.game);
  // const { playerList } = useSelector((state) => state.players);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playerScoring, setPlayerScoring] = useState('');


  return (
    <>
    { modalIsOpen && <PlayerAddScore isOpen={modalIsOpen} setIsOpen={setModalIsOpen} player={playerScoring}></PlayerAddScore>}
      <h2 className="font-bold text-4xl text-center py-5">SCOREBOARD</h2>

      <PlayerList
        addListClasses="flex-wrap justify-around gap-y-5"
        addItemClasses=""
        button="ADD SCORE"
        btnAction={(playerId) => {
          setPlayerScoring(playerId)
          setModalIsOpen(true)
        }}
      ></PlayerList>
    </>
  );
};

export default ScoreBoard;

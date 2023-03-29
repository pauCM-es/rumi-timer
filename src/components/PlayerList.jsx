import React from "react";
import { useSelector } from "react-redux";

import PlayerItem from "./PlayerItem";
import { sounds, playAudio } from "../utils/sounds";


const PlayerList = ({
  addListClasses,
  addItemClasses,
  buttonText,
  btnAction,
  btnClass,
}) => {

  const { playerList } = useSelector((state) => state.players);
  const btnSound = new Audio(sounds.click);


  return (
    <div className={`max-w-[360px] mx-auto flex ${addListClasses}`}>
      {playerList.map((player) => {
        return (
          <div className="flex-col-center w-1/3">
            <PlayerItem
              key={player.id}
              player={player}
              addItemClasses={addItemClasses}
              crown='true'
            ></PlayerItem>
            {player.isAlive && (
              <button className={btnClass} onClick={() => {
                playAudio(btnSound)
                btnAction(player)
                }}>
                {buttonText}
              </button>
            )}
            {!player.isAlive && (
              <button className={btnClass} onClick={() => {
                playAudio(btnSound)
                btnAction(player)
                }}>
                  <img src="./assets/icons/skull.png" className="w-8" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;

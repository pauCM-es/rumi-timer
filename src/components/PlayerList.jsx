import React from "react";
import { useSelector } from "react-redux";

import PlayerItem from "./PlayerItem";

const PlayerList = ({
  addListClasses,
  addItemClasses,
  buttonText,
  btnAction,
  btnClass,
}) => {
  const { playerList } = useSelector((state) => state.players);

  return (
    <div className={`flex ${addListClasses}`}>
      {playerList.map((player) => {
        return (
          <div className="flex-col-center">
            <PlayerItem
              key={player.id}
              player={player}
              addItemClasses={addItemClasses}
              crown='true'
            ></PlayerItem>
            {player.isAlive && (
              <button className={btnClass} onClick={() => btnAction(player)}>
                {buttonText}
              </button>
            )}
            {!player.isAlive && (
              <button className={btnClass} onClick={() => btnAction(player)}>
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

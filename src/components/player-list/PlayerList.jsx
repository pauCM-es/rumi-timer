import React from "react";
import { useSelector } from "react-redux";

import PlayerItem from "../player-item/PlayerItem";


const PlayerList = ({ addListClasses, addItemClasses }) => {

  const { playerList } = useSelector((state) => state.players )
  
  return (
    <div className={`flex ${addListClasses}`} >
      {playerList.map((player) => {
        return (
          <div className="flex-col-center">
            <PlayerItem key={player.id} player={player} addItemClasses={addItemClasses} ></PlayerItem>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;

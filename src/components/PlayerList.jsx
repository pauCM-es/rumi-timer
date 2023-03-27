import React from "react";
import { useSelector } from "react-redux";

import PlayerItem from "./PlayerItem";


const PlayerList = ({ addListClasses, addItemClasses, button, btnAction, btnClass }) => {

  const { playerList } = useSelector((state) => state.players )
  
  return (
    <div className={`flex ${addListClasses}`} >
      {playerList.map((player) => {
        return (
          <div className="flex-col-center">
            <PlayerItem key={player.id} player={player} addItemClasses={addItemClasses} ></PlayerItem>
            <button className={btnClass} onClick={()=>btnAction(player)}>{button}</button>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;

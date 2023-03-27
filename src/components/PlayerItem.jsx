import React from "react";

const PlayerItem = ({ player, addItemClasses }) => {
  return (
    <div className={`w-fit flex-col-center ${addItemClasses}`}>
      {
        !player.isAlive && <div className="absolute z-10 w-32 aspect-square flex justify-center -mt-12">
          <div className="absolute w-1 h-36 bg-rose-700 rotate-45 rounded-md"></div>
          <div className="absolute w-1 h-36 bg-rose-700 -rotate-45 rounded-md"></div>
        </div>
      }
      <div
        style={{ background: `${player.color}` }}
      className={`w-24 flex-center aspect-square rounded-full  ${!player.isAlive && "grayscale"}`}
      >
        <img
          className="w-20 aspect-square rounded-full"
          src={player.avatar}
          alt={`avatar for player${player.id}`}
        />
      </div>
      <p>
        P{player.id} - {player.alias}
      </p>
      <p>{player.score} pts.</p>
    </div>
  );
};

export default PlayerItem;

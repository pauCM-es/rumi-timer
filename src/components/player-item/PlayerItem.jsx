import React from "react";

const PlayerItem = ({ player, addItemClasses }) => {
  return (
    <div className={`w-fit flex-col-center ${addItemClasses}`}>
      <div
        style={{ background: `${player.color}` }}
        className="w-24 flex-center aspect-square rounded-full"
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

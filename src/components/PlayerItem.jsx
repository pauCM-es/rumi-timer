import React from "react";
import '../styles/animations.css'

const PlayerItem = ({ player, addItemClasses, crown }) => {
  return (
    <div className={`w-full flex-col-center ${addItemClasses}`}>
      {!player.isAlive && (
        <div className="absolute z-10 w-32 aspect-square flex justify-center -mt-12">
          <div className="absolute w-1 h-36 bg-rose-700 rotate-45 rounded-md"></div>
          <div className="absolute w-1 h-36 bg-rose-700 -rotate-45 rounded-md"></div>
        </div>
      )}
      <div
        style={{ background: `${player.color}` }}
        className={`relative w-24 flex-center aspect-square rounded-full  ${
          !player.isAlive && "grayscale"
        }`}
      >
        {crown && <img src="./assets/icons/crown.png" alt="crown" className="absolute w-8 -top-4 right-0 rotate-[40deg]"/>}
        <img
          className="w-20 aspect-square rounded-full"
          src={player.avatar}
          alt={`avatar for player${player.id}`}
        />
        <div className="heart flex absolute bottom-2 w-6 justify-center items-center">
          <img src="./assets/icons/heart-full.svg" className="absolute" alt="lifes bought indicator"/>
          <span className="absolute text-sm">{player.lifes}</span>
        </div>
      </div>
      <p>
        P{player.id} - {player.alias}
      </p>
      <p> {player.score} pts.</p>
    </div>
  );
};

export default PlayerItem;

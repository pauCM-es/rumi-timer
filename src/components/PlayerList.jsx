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
  const { playersWinning } = useSelector((state) => state.game);
  const { scoresLog } = useSelector((state) => state.game);
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
              crown={playersWinning.includes(player.id)}
            ></PlayerItem>
            {/* ---------------- BTN ACTION (EDIT / ADD SCORE)  / ALREADY SCORED ------------------- */}
            {player.isAlive && (
              <button
                className={btnClass}
                onClick={() => {
                  playAudio(btnSound);
                  !scoresLog.includes(player.id) && btnAction(player);
                }}
              >
                {!scoresLog.includes(player.id) ? (
                  buttonText
                ) : (
                  <img
                    src="./assets/icons/checkmark.svg"
                    alt="checkmark icon"
                    className="w-4"
                  />
                )}
              </button>
            )}
            {/* ---------------- BTN RESURRECT ------------------- */}

            {!player.isAlive && (
              <button
                className={btnClass}
                onClick={() => {
                  playAudio(btnSound);
                  playerList.length === scoresLog.length && btnAction(player);
                }}
              >
                <img
                  src="./assets/icons/skull.png"
                  alt="skull icon"
                  className="w-8"
                />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;

import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PlayerEdit from "../../components/PlayerEdit";
import { setLifePrice, setTime } from "../../redux/game/game.action";
import {
  addPlayer,
  removeLastPlayer,
} from "../../redux/players/players.action";
import PlayerList from "../../components/PlayerList";
import { sounds, playAudio } from "../../utils/sounds";

const GameSettings = () => {
  const { turnTime, lifePrice } = useSelector((state) => state.game);
  const { playerList } = useSelector((state) => state.players);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState("");

  const btnSound = new Audio(sounds.click);

  return (
    <Fragment>
      {modalIsOpen && (
        <PlayerEdit
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          player={playerToEdit}
        ></PlayerEdit>
      )}

      <section className="p-5 flex flex-col items-center">
        <h1 className="text-center text-xl font-bold">GAME SETTINGS</h1>
        {/* ---------------------- TIME SETTING ---------------------------------- */}
        <section className="w-full">
          <h3 className="mt-5 mb-3">TIME PER TURN (in seconds)</h3>
          <div className="flex gap-5">
            <button
              onClick={() => {
                playAudio(btnSound);
                turnTime > 5 && setTime(turnTime - 5);
              }}
            >
              -
            </button>
            <p>{turnTime}</p>
            <button
              onClick={() => {
                playAudio(btnSound);
                turnTime < 60 && setTime(turnTime + 5);
              }}
            >
              +
            </button>
          </div>
        </section>
        {/* ---------------------- PRICE SETTING ---------------------------------- */}
        <section className="w-full">
          <h3 className="mt-5 mb-3">PRICE TO COME FROM THE DEATH (€)</h3>
          <div className="flex gap-5">
            <button
              onClick={() => {
                playAudio(btnSound);
                lifePrice > 10 && setLifePrice(lifePrice - 10);
              }}
            >
              -
            </button>
            <p>
              {lifePrice < 100
                ? `0,${lifePrice}`
                : `${Math.floor(lifePrice / 100)},${lifePrice % 100}`}
            </p>
            <button
              onClick={() => {
                playAudio(btnSound);
                lifePrice < 200 && setLifePrice(lifePrice + 10);
              }}
            >
              +
            </button>
          </div>
        </section>
        {/* ---------------------- PLAYERS SETTINGS ---------------------------------- */}
        <section className="w-full my-3">
          <div className="flex gap-5">
            <h3 className="mt-5 mb-3">PLAYERS</h3>
            <div className="flex gap-5">
              <button
                type="button"
                onClick={() => {
                  playAudio(btnSound);
                  playerList.length < 6 && addPlayer(playerList.length + 1);
                }}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  playAudio(btnSound);
                  playerList.length > 0 && removeLastPlayer();
                }}
              >
                -
              </button>
            </div>
          </div>
          {/* ---------------------- PLAYER LIST ---------------------------------- */}
          <PlayerList
            addListClasses=" flex-wrap gap-y-5"
            addItemClasses=""
            buttonText="Edit"
            btnClass="border border-slate-700 rounded-md px-2"
            btnAction={(player) => {
              setPlayerToEdit(player);
              setModalIsOpen(true);
            }}
          ></PlayerList>
        </section>

        <Link to="/timer">
          <button
            onClick={() => playAudio(btnSound)}
            className="bg-slate-700 text-white text-2xl border-2 border-white rounded-lg px-3 py-1 "
          >
            START
          </button>
        </Link>
      </section>
    </Fragment>
  );
};

export default GameSettings;

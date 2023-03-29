import React, { Fragment, useState } from "react";
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

      <section className="w-fit p-5 flex flex-col items-center">
        <h1 className="text-center text-xl font-bold mb-3">GAME SETTINGS</h1>
        <div className="flex max-w-[360px] w-full">
          {/* ---------------------- TIME SETTING ---------------------------------- */}
          <section className="max-w-[180px] w-1/2 p-3 flex-col-center">
            <h3>TIME PER TURN</h3>
            <div className="flex gap-5 mt-3">
              <button
                className="border border-slate-700 rounded-md w-6 aspect-square 
                hover:bg-slate-700 hover:text-white"
                onClick={() => {
                  playAudio(btnSound);
                  turnTime > 5 && setTime(turnTime - 5);
                }}
              >
                -
              </button>
              <p>{turnTime} sg.</p>
              <button
                className="border border-slate-700 rounded-md w-6 aspect-square 
                hover:bg-slate-700 hover:text-white"
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
          <section className="max-w-[180px] w-1/2 p-3 flex-col-center">
            <h3>RESURRECTION</h3>
            <div className="flex gap-5 mt-3">
              <button
                className="border border-slate-700 rounded-md w-6 aspect-square 
                hover:bg-slate-700 hover:text-white"
                onClick={() => {
                  playAudio(btnSound);
                  lifePrice > 10 && setLifePrice(lifePrice - 10);
                }}
              >
                -
              </button>
              <p>
                {lifePrice < 100
                  ? `0,${lifePrice}€`
                  : `${Math.floor(lifePrice / 100)},${lifePrice % 100}€`}
              </p>
              <button
                className="border border-slate-700 rounded-md w-6 aspect-square 
                hover:bg-slate-700 hover:text-white"
                onClick={() => {
                  playAudio(btnSound);
                  lifePrice < 200 && setLifePrice(lifePrice + 10);
                }}
              >
                +
              </button>
            </div>
          </section>
        </div>

        {/* ---------------------- PLAYERS SETTINGS ---------------------------------- */}
        <section className="max-w-[360px] my-8">
          <div className="flex gap-5 mb-5">
            <h3>PLAYERS</h3>
            <div className="flex items-center gap-5">
              <button
                type="button"
                className="border border-slate-700 rounded-md w-6 h-6 hover:bg-slate-700 hover:text-white"
                onClick={() => {
                  playAudio(btnSound);
                  playerList.length < 6 && addPlayer(playerList.length + 1);
                }}
              >
                +
              </button>
              <button
                type="button"
                className="border border-slate-700 rounded-md w-6 h-6 hover:bg-slate-700 hover:text-white"
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
            btnClass="border border-slate-700 rounded-md px-2 mt-2 hover:bg-slate-700 hover:text-white"
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

import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PlayerItem from "../../components/player-item/PlayerItem";
import PlayerEdit from "../../components/player-edit/PlayerEdit"
import { setLifePrice, setTime } from "../../redux/game/game.action";
import {
  addPlayer,
  removeLastPlayer,
} from "../../redux/players/players.action";

const GameSettings = () => {
  const { turnTime, lifePrice } = useSelector((state) => state.game);
  const { playerList } = useSelector((state) => state.players);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState('');

  useEffect(() => {
    console.log(playerList);
  }, [playerList]);

  return (
    <Fragment>
      { modalIsOpen && <PlayerEdit isOpen={modalIsOpen} setIsOpen={setModalIsOpen} player={playerToEdit}></PlayerEdit>}

      <section className="fixed inset-0 h-screen p-5 flex flex-col items-center">
        <h1 className="text-center text-xl font-bold">GAME SETTINGS</h1>
        <section className="w-full">
          <h3 className="mt-5 mb-3">TIME PER TURN (in seconds)</h3>
          <div className="flex gap-5">
            <button
              onClick={() => {
                turnTime > 5 && setTime(turnTime - 5);
              }}
            >
              -
            </button>
            <p>{turnTime}</p>
            <button
              onClick={() => {
                turnTime < 60 && setTime(turnTime + 5);
              }}
            >
              +
            </button>
          </div>
        </section>
        <section className="w-full">
          <h3 className="mt-5 mb-3">PRICE TO COME FROM THE DEATH (€)</h3>
          <div className="flex gap-5">
            <button
              onClick={() => {
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
                lifePrice < 200 && setLifePrice(lifePrice + 10);
              }}
            >
              +
            </button>
          </div>
        </section>
        <section className="w-full my-3">
          <div className="flex gap-5">
            <h3 className="mt-5 mb-3">PLAYERS</h3>
            <div className="flex gap-5">
              <button
                type="button"
                onClick={() => {
                  playerList.length < 6 && addPlayer(playerList.length + 1);
                }}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  playerList.length > 0 && removeLastPlayer();
                }}
              >
                -
              </button>
            </div>
          </div>

          <div className="flex flex-wrap w-fit justify-between gap-y-5">
            {playerList.map((player) => {
              return (
                <div className="flex-col-center">
                  <PlayerItem key={player.id} player={player} addItemClasses=""></PlayerItem>
                  <button
                    onClick={() => {
                      setPlayerToEdit(player)
                      setModalIsOpen(true)
                    }}
                    className="border border-slate-700 rounded-md px-2"
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <Link to="/timer">
          <button className="bg-slate-700 text-white text-2xl border-2 border-white rounded-lg px-3 py-1 ">
            START
          </button>
        </Link>
      </section>
    </Fragment>
  );
};

export default GameSettings;

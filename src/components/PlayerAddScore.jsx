import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { accumulatePot } from "../redux/game/game.action";
import { setPlayer, setPlayerProperty } from "../redux/players/players.action";
import { sounds, playAudio } from "../utils/sounds";

const PlayerAddScore = ({ isOpen, setIsOpen, player, highestScore }) => {
  const { lifePrice } = useSelector((state) => state.game);
  const [addScore, setAddScore] = useState(0);
  const [newScore, setNewScore] = useState(parseInt(player.score));

  const btnSound = new Audio(sounds.click);
  const coinSound = new Audio(sounds.coin);

  useEffect(() => {
    let value = parseInt(player.score) + parseInt(addScore);
    setNewScore(value);
  }, [addScore]);

  const savePlayer = (ev) => {
    ev.preventDefault();
    setPlayer(player.id, {
      ...player,
      score: newScore,
      isAlive: newScore > 100 ? false : true,
    });
    setIsOpen(false);
  };

  const resurrect = (ev) => {
    ev.preventDefault();
    setPlayer(player.id, {
      ...player,
      score: highestScore,
      lifes: player.lifes+1,
      isAlive: true
    });
    accumulatePot(lifePrice)
    playAudio(coinSound)
    setIsOpen(false);
  }

  const handleInput = (event) => {
    const { value } = event.target;
    setAddScore(value);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/70 grayscale z-30"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 z-30 flex justify-center items-center p-2 text-xl">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="mx-auto max-w-sm z-40 h-fit rounded-lg bg-white p-3">
              <Dialog.Title
                as="h2"
                className="font-bold mb-5 text-center text-2xl"
              >
                {player.alias} - {newScore ? newScore : player.score}pts.
              </Dialog.Title>
              <form onSubmit={player.isAlive ? savePlayer : resurrect} className="flex justify-between">
                {/* ---------------------- SCORE INPUT ---------------------------------- */}
                { player.isAlive 
                  ? <label htmlFor="score" className="w-1/2">
                    <h3>ADD SCORE:</h3>
                    <input
                      className="w-full mt-2 p-2 bg-slate-300 rounded-md"
                      type="number"
                      inputMode="numeric"
                      name="score"
                      onChange={handleInput}
                    />
                  </label>
                  : <div className="pr-5">
                    <p className="">WANNA RESURRECT?</p>
                    <p className="text-sm">Your new score will be: <span className="font-bold text-lg">{highestScore}pts.</span></p>
                  </div>
                }
                {/* ---------------------- BUTTONS ---------------------------------- */}
                <div className="flex gap-5 items-end">
                  <button
                    className="border b-2 border-rose-700 p-2 rounded-md w-12 h-fit text-rose-700 
                  hover:bg-rose-700 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    X
                  </button>
                  <button
                    className="border b-2 border-teal-600 p-2 rounded-md w-12 h-fit text-teal-600
                  hover:bg-teal-600 hover:text-white"
                    type="submit"
                  >
                    OK
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PlayerAddScore;

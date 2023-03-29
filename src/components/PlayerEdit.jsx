import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RadioGroup } from "@headlessui/react";
import { setPlayer } from "../redux/players/players.action";
import { characters } from "../utils/characters";
import { sounds, playAudio } from "../utils/sounds";

const PlayerEdit = ({ isOpen, setIsOpen, player }) => {
  const [editingPlayer, setEditingPlayer] = useState(player);
  const [colorSelected, setColorSelected] = useState(player.color || colors[0]);
  const [characterSelected, setCharacterSelected] = useState(
    player.avatar || characters[0]
  );
  const colors = [
    "#0d9488",
    "#3b82f6",
    "#be185d",
    "#84cc16",
    "#701a75",
    "#fcd34d",
  ];
  const clickSound = new Audio(sounds.melodicClick);
  const btnSound = new Audio(sounds.click);

  useEffect(() => {
    setEditingPlayer({
      ...editingPlayer,
      color: colorSelected,
      avatar: characterSelected,
    });
    console.log(editingPlayer);
  }, [colorSelected, characterSelected]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setEditingPlayer({
      ...editingPlayer,
      [name]: value,
    });
  };

  const savePlayer = (ev) => {
    ev.preventDefault();
    setPlayer(editingPlayer.id, editingPlayer);
    playAudio(clickSound);
    setIsOpen(false);
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
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-center items-center p-2 text-xl">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="mx-auto max-w-sm h-fit rounded-lg bg-white p-3">
              <Dialog.Title
                as="h2"
                className="font-bold mb-5 text-center text-2xl"
              >
                EDIT PLAYER {editingPlayer.id}
              </Dialog.Title>
              <form onSubmit={savePlayer}>
                {/* ---------------------- ALIAS ---------------------------------- */}
                <label htmlFor="alias">
                  <h3> SELECT AN ALIAS</h3>
                  <input
                    type="text"
                    name="alias"
                    className="mt-2 mb-5 p-2 bg-slate-300 rounded-md"
                    value={editingPlayer.alias}
                    onChange={handleInput}
                  />
                </label>
                {/* ---------------------- COLOR ---------------------------------- */}
                <RadioGroup
                  value={colorSelected}
                  onChange={setColorSelected}
                  className="flex flex-col gap-3"
                >
                  <RadioGroup.Label as="h3" className="flex w-full">
                    PICK A COLOR
                  </RadioGroup.Label>
                  <div className="flex-center-wrap justify-between">
                    {colors.map((color) => (
                      <RadioGroup.Option
                        key={color}
                        value={color}
                        style={{ background: `${color}` }}
                        className={({ checked }) =>
                          checked
                            ? "ring-4 ring-zinc-500 rounded-md w-10 aspect-square hover:scale-110"
                            : "w-10 aspect-square rounded-md hover:scale-110"
                        }
                      ></RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                {/* ---------------------- AVATAR ---------------------------------- */}
                <RadioGroup
                  value={characterSelected}
                  onChange={setCharacterSelected}
                  className="flex flex-col gap-3 mt-10"
                >
                  <RadioGroup.Label>CHOSE AVATAR</RadioGroup.Label>
                  <div className="flex flex-wrap justify-between gap-y-3">
                    {characters.lowerDecks.map((char) => (
                      <RadioGroup.Option
                        key={char}
                        value={char}
                        className={({ checked }) =>
                          checked ? "w-[23%]" : "w-[23%] grayscale"
                        }
                      >
                        <img
                          src={char}
                          alt="avatar"
                          className=" aspect-square object-cover rounded-full hover:scale-110"
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                {/* ---------------------- BUTTONS ---------------------------------- */}
                <div className="flex gap-10 justify-evenly my-5">
                  <button
                    className="border b-2 border-rose-700 p-2 rounded-md w-36 text-rose-700 
                  hover:bg-rose-700 hover:text-white"
                    onClick={() => {
                      playAudio(btnSound);
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="border b-2 border-teal-600 p-2 rounded-md w-36 text-teal-600
                  hover:bg-teal-600 hover:text-white"
                    type="submit"
                  >
                    Save
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

export default PlayerEdit;

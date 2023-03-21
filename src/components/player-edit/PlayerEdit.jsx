import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RadioGroup } from "@headlessui/react";
import { setPlayer, setPlayerProperty } from "../../redux/players/players.action";

const PlayerEdit = ({ isOpen, setIsOpen, player }) => {
  const colors = [
    "#0d9488",
    "#3b82f6",
    "#be185d",
    "#84cc16",
    "#701a75",
    "#fcd34d",
  ];
  const [editingPlayer, setEditingPlayer] = useState(player);
  const [colorSelected, setColorSelected] = useState(colors[0]);

  useEffect(() => {
    setEditingPlayer({
      ...editingPlayer,
      color: colorSelected,
    });
    console.log(editingPlayer);

  }, [colorSelected]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setEditingPlayer({
      ...editingPlayer,
      [name]: value,
    });
  };

  const savePlayer = (ev) => {
    ev.preventDefault();
    setPlayer(editingPlayer.id, editingPlayer)
    setIsOpen(false)
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

        <div className="fixed inset-0 flex justify-center h-fit mt-14 p-4 text-xl">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-3">
              <Dialog.Title as="h2" className="font-bold mb-3">
                EDIT PLAYER {editingPlayer.id}
              </Dialog.Title>
              <form onSubmit={savePlayer}>
                <label htmlFor="alias">
                  <h3> SELECT AN ALIAS</h3>
                  <input
                    type="text"
                    name="alias"
                    className="mt-2 mb-5"
                    value={editingPlayer.alias}
                    onChange={handleInput}
                  />
                </label>

                <RadioGroup
                  value={colorSelected}
                  onChange={setColorSelected}
                  className="flex flex-col gap-3"
                >
                  <RadioGroup.Label as="h3" className="flex w-full">
                    PICK A COLOR
                  </RadioGroup.Label>
                  <div className="flex-center-wrap gap-3">
                    {colors.map((color) => (
                      <RadioGroup.Option
                        name="color"
                        key={color}
                        value={color}
                        style={{ background: `${color}` }}
                        className={({ checked }) =>
                          checked
                            ? "ring-4 ring-zinc-500 rounded-md w-10 aspect-square"
                            : "w-10 aspect-square rounded-md"
                        }
                      ></RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex gap-10 justify-center mt-10">
                  <button onClick={() => setIsOpen(false)}>Cancel</button>
                  <button type="submit">Save</button>
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

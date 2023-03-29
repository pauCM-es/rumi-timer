import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlayerItem from "../../components/PlayerItem";
import { sounds, playAudio } from "../../utils/sounds";

const Timer = () => {
  const { turnTime, matchId } = useSelector((state) => state.game);
  const { playerList } = useSelector((state) => state.players);
  const [timer, setTimer] = useState(turnTime);
  const [timerIsOn, setTimerIsOn] = useState(false);
  let numPlayers = playerList.length;
  const [idTurn, setIdTurn] = useState({
    previous: numPlayers,
    current: 1,
    next: 2,
  });

  let countDown = null;
  const audioTimer = new Audio(sounds.heartbeat);
  const audioTimerEnd = new Audio(sounds.explosion);
  const btnSound = new Audio(sounds.click);
  const synth = window.speechSynthesis;

  useEffect(() => {
    if (timerIsOn && timer > 0) {
      countDown = setTimeout(() => {
        setTimer((oldTimer) => oldTimer - 1);
        if (timer !== 1) {
          audioTimer.currentTime = 0;
          audioTimer.play();
          timer <= 5 &&
            setTimeout(() => {
              audioTimer.currentTime = 0;
              audioTimer.play();
            }, 500);
        } else {
          audioTimerEnd.currentTime = 0;
          audioTimerEnd.play();
        }
      }, 1000);
    } else {
      setTimerIsOn(false);
    }
  }, [timer, timerIsOn, idTurn]);

  const nextTurn = (dir) => {
    clearTimeout(countDown);
    setTimer(turnTime);
    dir === "next" && nextPlayer(idTurn.current);
    dir === "prev" && previousPlayer(idTurn.current);
  };
  const stopTimer = () => {
    clearTimeout(countDown);
    setTimerIsOn(false);
  };

  const nextPlayer = (id) => {
    setIdTurn({
      previous: id,
      current: idTurn.next,
      next:
        id < numPlayers
          ? idTurn.next !== numPlayers
            ? idTurn.next + 1
            : 1
          : 2,
    });
  };
  const previousPlayer = (id) => {
    setIdTurn({
      previous: idTurn.previous === 1 ? numPlayers : idTurn.previous - 1,
      current: idTurn.previous,
      next: id,
    });
  };

  const speak = (input) => {
    const utterThis = new SpeechSynthesisUtterance(input);
    synth.speak(utterThis);
  };
  const whoIsNext = () => {
    const nextPlayer = playerList.find((player) => player.id === idTurn.next);
    speak(nextPlayer.alias);
  };

  return (
    <section className="fixed inset-0 h-screen w-full max-w-3xl py-5 flex flex-col items-center bg-slate-800 text-white">
      <div className="w-full flex items-center justify-around h-1/6">
        <Link
          to="/settings"
          onClick={() => playAudio(btnSound)}
          className="text-xl border py-1 rounded-md w-20 text-center hover:scale-90"
        >
          SETTINGS
        </Link>
        <div>
          <h2 className="font-bold text-4xl">TIMER</h2>
          <h3 className="text-center">MATCH - {matchId}</h3>
        </div>
        <Link
          to="/score-board"
          onClick={() => playAudio(btnSound)}
          className="text-xl border py-1 rounded-md w-20 text-center hover:scale-90"
        >
          SCORES
        </Link>
      </div>
      {/* --------------------- PLAYER LIST --------------------------- */}
      {playerList && (
        <section className="h-fit w-full flex justify-evenly">
          <PlayerItem
            addItemClasses="scale-75 grayscale"
            player={playerList.find((player) => player.id === idTurn.previous)}
          ></PlayerItem>
          <PlayerItem
            player={playerList.find((player) => player.id === idTurn.current)}
          ></PlayerItem>
          <PlayerItem
            addItemClasses="scale-75 grayscale"
            player={playerList.find((player) => player.id === idTurn.next)}
          ></PlayerItem>
        </section>
      )}

      {/* ---------------------- TIMER ---------------------------------- */}
      <section
        className={`h-3/6 w-full flex-center  border border-white ${
          timer <= 5 ? "bg-rose-700" : "bg-emerald-400"
        }`}
        onClick={() => {
          nextTurn("next");
          whoIsNext();
        }}
      >
        <div className={`text-9xl ${timer <= 3 && "scale-150"}`}>{timer}</div>
      </section>

      {/* ----------------------- CONTROLLERS ----------------------------- */}
      <section className="h-1/6 flex-center gap-10">
        <button
          className="w-16 h-16 "
          onClick={() => {
            playAudio(btnSound);
            nextTurn("prev");
          }}
        >
          <svg fill="currentColor" viewBox="0 0 32 32">
            <title>previous</title>
            <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
            <path d="M14 16l8-6v12z"></path>
            <path d="M10 10h4v12h-4v-12z"></path>
          </svg>
        </button>

        {timerIsOn ? (
          <button
            className="bg-rose-700 text-white text-2xl w-24 border-2 border-white rounded-lg px-3 py-1"
            onClick={() => {
              speak("stop");
              stopTimer();
            }}
          >
            STOP
          </button>
        ) : (
          <button
            className="bg-teal-700 text-white text-2xl w-24 border-2 border-white rounded-lg px-3 py-1"
            onClick={() => {
              speak("start");
              setTimerIsOn(true);
            }}
          >
            START
          </button>
        )}

        <button
          className="w-16 h-16"
          onClick={() => {
            playAudio(btnSound);
            nextTurn("next");
          }}
        >
          <svg fill="currentColor" viewBox="0 0 32 32">
            <title>next</title>
            <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zM16 29c7.18 0 13-5.82 13-13s-5.82-13-13-13-13 5.82-13 13 5.82 13 13 13z"></path>
            <path d="M18 16l-8-6v12z"></path>
            <path d="M22 10h-4v12h4v-12z"></path>
          </svg>
        </button>
      </section>
    </section>
  );
};

export default Timer;

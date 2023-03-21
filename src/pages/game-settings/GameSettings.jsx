import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PlayerItem from '../../components/player-item/PlayerItem';
import { setLifePrice, setTime } from '../../redux/game/game.action';
import { addPlayer, removeLastPlayer } from '../../redux/players/players.action';

const GameSettings = () => {

  const { turnTime, lifePrice } = useSelector(state => state.game)
  const { playerList } = useSelector(state => state.players)

  useEffect(() => {
    console.log(playerList);
  }, [playerList])

  return (
    <section className='h-screen p-5 flex flex-col items-center'>
      <h1 className='text-center text-xl font-bold'>GAME SETTINGS</h1>
      <section className='w-full'>
        <h3 className='mt-5 mb-3'>TIME PER TURN (in seconds)</h3>
        <div className='flex gap-5'>
          <span onClick={() => { turnTime > 5 && setTime(turnTime - 5) }}
          >-</span>
          <p>{ turnTime }</p>
          <span onClick={() => { turnTime < 60 && setTime(turnTime + 5) }}
          >+</span>
        </div>
      </section>
      <section className='w-full'>
        <h3 className='mt-5 mb-3'>PRICE TO COME FROM THE DEATH (€)</h3>
        <div className='flex gap-5'>
          <span onClick={() => { lifePrice > 10 && setLifePrice(lifePrice - 10) }}>-</span>
          <p>
            {
              lifePrice < 100 ? `0,${ lifePrice }` : `${ Math.floor(lifePrice/100) },${ lifePrice % 100 }`
            }
          </p>
          <span onClick={() => { lifePrice < 200 && setLifePrice(lifePrice + 10) }}>+</span>
        </div>
      </section>
      <section className='w-full my-3'>
        <div className='flex gap-5'>
          <h3 className='mt-5 mb-3'>PLAYERS</h3>
          <div className='flex gap-5'>
            <button type='button' onClick={()=> {
                playerList.length < 6 && addPlayer(playerList.length +1)
              }} 
            >+</button>
            <button type='button' onClick={()=> {
                playerList.length > 0 && removeLastPlayer()
              }} 
            >-</button>
          </div>
        </div>

        <div className='flex flex-wrap gap-5 w-fit'>
          {
            playerList.map(player => {
              return (
                <div className='flex-col-center'>
                  <PlayerItem key={player.id} player= {player}></PlayerItem>
                  <button 
                  player={ player }
                  className='border border-slate-700 rounded-md px-2'
                  >Edit</button>
                </div>
              )
            })
          }
        </div>
      </section>
      
      <Link to='/timer'>
        <button
        className="bg-slate-700 text-white text-2xl border-2 border-white rounded-lg px-3 py-1 "
        >START</button>
      </Link>

    </section>
  )
}

export default GameSettings
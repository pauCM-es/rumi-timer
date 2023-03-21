import React from 'react'

const PlayerItem = ( { player} ) => {
  return (
    <div 
    className='w-fit flex-col-center m-1'>
      <p>P{ player.id }</p>
      <div 
      style={{background: `${player.color}`}}
      className='w-20 flex-center aspect-square rounded-full'>
        <img 
        className='w-3/5 aspect-square'
        src={ player.avatar } 
        alt={`avatar for player${ player.id }`} />
      </div>
      <p>{ player.alias }</p>
      <p>{ player.score } pts.</p>
    </div>
  )
}

export default PlayerItem
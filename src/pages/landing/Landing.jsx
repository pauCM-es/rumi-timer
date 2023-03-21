import React from 'react'
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <section
    className='bg-gradient-to-tr from-fuchsia-500 to-cyan-500 h-screen w-screen flex-col-center gap-20'
    >
      <div className="text-white text-5xl text-center">
        LET'S PLAY RUMI!!!
      </div>
      <Link 
      to={"/settings"}
      className="bg-slate-700 text-white text-3xl border-2 border-white rounded-lg px-3 py-1 "
      >
        START</Link>
    </section>
  )
}

export default Landing
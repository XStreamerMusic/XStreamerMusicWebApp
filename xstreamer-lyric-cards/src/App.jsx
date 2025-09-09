import Nav from './Nav';
import CardRatio from './CardRatio/CardRatio';
import { useState } from 'react';

function App() {

  return (
    <>
      <Nav />
      <header>
        <h1>Lyric Cards</h1>
      </header>
      <CardRatio />
    </>
  )
}

export default App

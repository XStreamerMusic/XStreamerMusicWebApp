import Nav from './Nav';
import { useState } from 'react';
import { CardProvider } from './CardContext';
import CardRatio from './CardRatio/CardRatio';

function App() {

  return (
    <>
      <Nav />
      <header>
        <h1>Lyric Cards</h1>
      </header>
      <CardProvider>
        <CardRatio />
      </CardProvider>
    </>
  )
}

export default App

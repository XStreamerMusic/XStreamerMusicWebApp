import Nav from './Nav';
import { useState } from 'react';
import { CardProvider } from './CardContext';
import CardRatio from './CardRatio/CardRatio';
import PreviewCard from './PreviewCard/PreviewCard';
import AdSection from './AdSection/AdSection';

function App() {

  return (
    <>
      <Nav />
      <header>
        <h1>Lyric Cards</h1>
      </header>
      <AdSection />
      <CardProvider>
        <CardRatio />
        <PreviewCard />
      </CardProvider>
    </>
  )
}

export default App

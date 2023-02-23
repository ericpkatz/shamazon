import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import HomeBody from './components/HomeBody';

const App = () => {
  return (
    <div>
      <>
        <Header />
        <HomeBody />
        <Footer />
        <Routes>
          <Route path='/Header' element={<Header />} />
          <Route path='/Footer' element={<Footer />} />
        </Routes>
      </>
    </div>
  );
}

export default App;

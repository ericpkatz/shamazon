import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Login } from './components/index'
import { Routes, Route } from 'react-router-dom';
import HomeBody from './components/HomeBody';


const App = () => {
  return (
    <div>
      <>
        <Header />
        <HomeBody />
        <Login/>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </>
    </div>
  );
}

export default App;

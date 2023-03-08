import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import HomeBody from './components/HomeBody';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Products } from './components/Products';

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
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Products' element={<Products />} />
        </Routes>
      </>
    </div>
  );
}

export default App;

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import { Login } from './components/index'
import { Routes, Route, Link } from 'react-router-dom';
import HomeBody from './components/HomeBody';
import { Register } from './components/Register';



const App = () => {
  return (
    <div>
      <>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>

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

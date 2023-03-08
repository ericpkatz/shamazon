import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route, Link } from 'react-router-dom';
import HomeBody from './components/HomeBody';
import { Register } from './components/Register';
import { Login } from './components/Login';


const App = () => {
  return (
    <div>
      <>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>

        <Header />
        <HomeBody />
        <Footer />
        <Routes>
        <Route path='/login' element={ <Login/>}/> 
        <Route path='/register' element={ <Register />}/> 
          <Route path='/Header' element={<Header />} />
          <Route path='/Footer' element={<Footer />} />
        </Routes>
      </>
    </div>
  );
}

export default App;

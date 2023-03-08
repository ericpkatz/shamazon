import React, {useState, useEffect} from 'react';
import { Login, Register, Products, Header, Footer } from './components/index'
import { Routes, Route, Link } from 'react-router-dom';
import HomeBody from './components/HomeBody';
import { fetchProducts } from './fetch';




const App = () => {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    //setProducts(fetchProducts())
    console.log(products)
  })

  return (
    <div>
      <>

        <Header />
        <Routes>
          
          <Route path='' element={<HomeBody />} />
          <Route path='/Header' element={<Header />} />
          <Route path='/Footer' element={<Footer />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Products' element={<Products />} />

        </Routes>
        <Footer />
      </>
    </div>
  );
}

export default App;

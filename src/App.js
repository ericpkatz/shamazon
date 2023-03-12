
import React, {useState, useEffect} from 'react';
import { Login, Register, Products, Header, Footer } from './components/index'
import { Routes, Route, Link } from 'react-router-dom';
import HomeBody from './components/HomeBody';
import { fetchProducts } from './fetch';
import { getUser } from './fetch';




const App = () => {
  const [products, setProducts] = useState([]);
  let [user, setUser] = useState({});

  const ueFetchProducts = async () => {
    setProducts(await fetchProducts())
  }


  const checkToken = async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
       const user = await getUser(token);
      setUser(user);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
  }

  useEffect(()=>{
    ueFetchProducts()
    checkToken();
  }, [])

  console.log(products)

  return (
    <div>
       <button onClick={ logout }>Logout</button>
      <>

        <Header />
        <Routes>

          
          <Route path='' element={<HomeBody />} />
          <Route path='/Header' element={<Header />} />
          <Route path='/Footer' element={<Footer />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register setUser ={setUser}/>} />
          <Route path='/Products' element={<Products products={products}/>} />

        </Routes>
        <Footer />
      </>
    </div>
  );
}

export default App;

import React from 'react'

import { Link } from 'react-router-dom';


const Header = () => {

    return (

        <header>
            <nav>
                <div className='headerContainer'>
                    <div className='logo'>
                        <img src='/images/fakeamazon.png' alt='logo' width='65px' />
                    </div>
                    <div className='olContainer'>
                        <ol>
                            <div className='menu'>
                                <div className='menubtn'>
                                    <img src='/images/menu.png' alt='menubtn' width='30px' />
                                    <li>Menu</li>
                                </div>
                            </div>
                        </ol>
                    </div>
                    <div className='search'>
                        <form>
                            <input type='text' placeholder='Search' />
                            <button type='submit'><img src='/images/search.png' alt='searchbtn' width='25px' /></button>
                        </form>
                    </div>
                    <div className='olContainer'>
                        <ol>
                            <div className='profile'>
                                <div className='profilebtn'>
                                    <img src='/images/profile.png' alt='profilebtn' width='30px' />

                                    <li><Link to='/Login'>Login</Link></li>

                                </div>
                            </div>
                            <div className='checkout'>
                                <div className='checkoutbtn'>
                                    <img src='/images/checkout.png' alt='checkoutbtn' width='30px' />
                                    <li>Cart</li>
                                </div>
                            </div>
                        </ol>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header


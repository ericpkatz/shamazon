import React, { useState } from "react";

const Logout = () => {
    return (
        <div className='logout-container'>
        <button className='logout-btn' onClick={ window.localStorage.removeItem('token') }>Logout</button>
    </div>
    )
  }
export default Logout;

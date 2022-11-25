import React from "react";
import classes from './Header.module.css';

export default function Header(props) {
  return (
    <div className="w-100 bg--white p--20 text-end top-0 position-sticky sticky-header-container">
      <button onClick={()=>{localStorage.removeItem('token');window.location.reload()}}>Logout</button>
     
    </div>
  );
}

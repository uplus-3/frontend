import React from 'react';
import { Outlet } from 'react-router-dom';

function Navbar(props) {
  return (
    <div>
      Navbar
      <Outlet />
    </div>
  );
}

export default Navbar;

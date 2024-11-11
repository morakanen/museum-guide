// src/pages/Homepagelayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './HomepageLayout.css'; 

function HomepageLayout() {
  return (
    <>
      <Navbar />
      <div className="content-wrapper">

        <Outlet />
      </div>
    </>
  );
}

export default HomepageLayout;
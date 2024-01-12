import './Main.css';
import React from 'react';
import Sidebar from '../../components/sidebar'; 

function Main() {
  return (
    <div className="screen">
      <Sidebar />
      <div className="main-content">
        <div className="content-title"><h1>Data Analisys</h1></div>
        <div className="content"></div>
      </div>
    </div>
  );
}

export default Main;
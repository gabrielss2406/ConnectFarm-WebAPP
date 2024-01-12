import React, { useState } from 'react';
import Logo from '../../static/logo.png';
import DataAnalisys from '../../static/dataAnalisys.png';
import DataAnalisysGray from '../../static/dataAnalisys_gray.png';
import DashBoard from '../../static/dashboard.png';
import DashBoardGray from '../../static/dashboard_gray.png';
import Performance from '../../static/performance.png';
import PerformanceGray from '../../static/performance_gray.png';

function Sidebar() {
  const [isDataAnalisysHovered, setIsDataAnalisysHovered] = useState(false);
  const [isPerformanceHovered, setIsPerformanceHovered] = useState(false);
  const [isDashBoardHovered, setIsDashBoardHovered] = useState(false);

  return (
    <div className="sidebar">
      <div className="title">
        <img className="imgLogo" src={Logo} alt="connectFarm-logo" />
        <h1>ConnectFarm</h1>
      </div>
      <div className="options">
        <div className="options-title">
          <h2>OPTIONS</h2>
        </div>
        
        <div className="menu">
          <button
            onMouseEnter={() => setIsDataAnalisysHovered(true)}
            onMouseLeave={() => setIsDataAnalisysHovered(false)}
          >
            <img
              className="imgOptions"
              src={isDataAnalisysHovered ? DataAnalisys : DataAnalisysGray}
              alt="connectFarm-logo"
            />
            DataAnalisys
          </button>
          <button
            onMouseEnter={() => setIsPerformanceHovered(true)}
            onMouseLeave={() => setIsPerformanceHovered(false)}
          >
            <img
              className="imgOptions"
              src={isPerformanceHovered ? Performance : PerformanceGray}
              alt="connectFarm-logo"
            />
            Performance
          </button>
          <button
            onMouseEnter={() => setIsDashBoardHovered(true)}
            onMouseLeave={() => setIsDashBoardHovered(false)}
          >
            <img
              className="imgOptions"
              src={isDashBoardHovered ? DashBoard : DashBoardGray}
              alt="connectFarm-logo"
            />
            DashBoard
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default Sidebar;
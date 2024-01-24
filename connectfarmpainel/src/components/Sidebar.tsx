import React, { useState } from 'react';
import Logo from '@/static/logo.png';
import DataAnalisys from '@/static/dataAnalisys.png';
import DataAnalisysGray from '@/static/dataAnalisys_gray.png';
import DashBoard from '@/static/dashboard.png';
import DashBoardGray from '@/static/dashboard_gray.png';
import Performance from '@/static/performance.png';
import PerformanceGray from '@/static/performance_gray.png';

function Sidebar() {
  const [isDataAnalisysHovered, setIsDataAnalisysHovered] = useState(false);
  const [isPerformanceHovered, setIsPerformanceHovered] = useState(false);
  const [isDashBoardHovered, setIsDashBoardHovered] = useState(false);

  return (
    <div className={`
        flex flex-col w-[15%] gap-2
        min-w-[200px] h-screen bg-[#303030]
    `}>
      <div className={`
        flex items-center justify-start
        w-full py-4 px-3
      `}>
        <img className="w-8 h-8 mr-1" src={Logo.src} alt="connectFarm-logo" />
        <h1 className='text-white font-semibold text-lg'>ConnectFarm</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <div className="flex w-full items-center justify-start pl-[20px]">
          <h2 className='text-[#8E8D8D] text-[8pt] font-bold'>OPTIONS</h2>
        </div>
        
        <div className="flex flex-col items-center justify-between w-full gap-3">
          <button
            className="option-btn"
            onMouseEnter={() => setIsDataAnalisysHovered(true)}
            onMouseLeave={() => setIsDataAnalisysHovered(false)}
          >
            <img
              className="w-6 h-6 mr-1"
              src={isDataAnalisysHovered ? DataAnalisys.src : DataAnalisysGray.src}
              alt="connectFarm-logo"
            />
            DataAnalisys
          </button>
          <button
            className="option-btn"
            onMouseEnter={() => setIsPerformanceHovered(true)}
            onMouseLeave={() => setIsPerformanceHovered(false)}
          >
            <img
              className="w-6 h-6 mr-1"
              src={isPerformanceHovered ? Performance.src : PerformanceGray.src}
              alt="connectFarm-logo"
            />
            Performance
          </button>
          <button
            className="option-btn"
            onMouseEnter={() => setIsDashBoardHovered(true)}
            onMouseLeave={() => setIsDashBoardHovered(false)}
          >
            <img
              className="w-6 h-6 mr-1"
              src={isDashBoardHovered ? DashBoard.src : DashBoardGray.src}
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
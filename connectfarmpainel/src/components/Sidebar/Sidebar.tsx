import React from 'react';
import Logo from '@/static/logo.png';
import DataAnalisys from '@/static/dataAnalisys.png';
import DataAnalisysGray from '@/static/dataAnalisys_gray.png';
import DashBoard from '@/static/dashboard.png';
import DashBoardGray from '@/static/dashboard_gray.png';
import Performance from '@/static/performance.png';
import PerformanceGray from '@/static/performance_gray.png';
import SidebarRoutes from './SidebarRoutes';

export default function Sidebar() {
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
          <SidebarRoutes mainIcon={DataAnalisys} altIcon={DataAnalisysGray} pageName="DataAnalisys" routeName="/painel"/>
          <SidebarRoutes mainIcon={Performance} altIcon={PerformanceGray} pageName="Performance" routeName="/"/>
          <SidebarRoutes mainIcon={DashBoard} altIcon={DashBoardGray} pageName="DashBoard" routeName="/"/>
        </div>
        
      </div>
    </div>
  );
}
import React from 'react';
import Image from 'next/image';
import Logo from '@/static/logo.png';
import DataAnalisys from '@/static/dataAnalisys.png';
import DataAnalisysGray from '@/static/dataAnalisys_gray.png';
import DashBoard from '@/static/dashboard.png';
import DashBoardGray from '@/static/dashboard_gray.png';
import Performance from '@/static/performance.png';
import PerformanceGray from '@/static/performance_gray.png';
import SidebarRoutes from './SidebarRoutes';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../shared/ui/sheet';
import { Button } from '../shared/ui/button';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import { IconUserFilled } from '@tabler/icons-react';


export default function Sidebar() {
  return (
    <nav>
    <div className='sm:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='bg-[#2D6432]'><AlignJustify /></Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <div className="mt-4 text-2xl text-white font-semibold">
              ConnectFarm
            </div>
          </SheetHeader>
          <div className="grid gap-4 py-4 justify-center mt-4">
            <Link href="/" className="text-white hover:text-gray-300 mt-2 text-center">Página inicial</Link>
            <Link href="/painel" className="text-white hover:text-gray-300 mt-2 text-center">Assinar Painel</Link>
            <Link href="/register" className="text-white hover:text-gray-300 mt-2 text-center">Registrar</Link>
            <Link href="/login" className="text-white hover:text-gray-300 mt-2 text-center">Entrar</Link>
            <Link href="#" className="text-white hover:text-gray-300 text-center">
              <div className={`
                flex items-center py-2 pl-3 pr-4
                bg-[#404440] rounded-full
              `}>
                <IconUserFilled className="mr-2" />
                <span>Contato</span>
              </div>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      </div>

    <div className={`
        hidden sm:flex flex-col w-[15%] gap-2
        min-w-[200px] h-screen bg-[#303030] fixed
    `}>
      <div className={`
        flex items-center justify-start
        w-full py-4 px-3
      `}>
        <Image className="w-8 h-8 mr-1" src={Logo} alt="connectFarm-logo" width={32} height={32} />
        <h1 className='text-white font-semibold text-lg'>ConnectFarm</h1>
      </div>
      <div className="flex flex-col justify-center w-full gap-4">
        <div className="flex w-full items-center justify-start pl-[20px]">
          <h2 className='text-[#8E8D8D] text-[8pt] font-bold'>OPTIONS</h2>
        </div>
        
        <div className="flex flex-col items-center justify-between w-full gap-3">
          <SidebarRoutes mainIcon={DataAnalisys} altIcon={DataAnalisysGray} pageName="DataAnalisys" routeName="/painel" />
          <SidebarRoutes mainIcon={Performance} altIcon={PerformanceGray} pageName="Performance" routeName="/" />
          <SidebarRoutes mainIcon={DashBoard} altIcon={DashBoardGray} pageName="DashBoard" routeName="/" />
        </div>
        
      </div>
    </div>
    </nav>
  );
}
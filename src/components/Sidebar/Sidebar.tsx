import React from 'react';
import Image from 'next/image';
import Logo from '@/static/logo.png';
import { SidebarRoutes } from './SidebarRoutes';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../shared/ui/sheet';
import { Button } from '../shared/ui/button';
import Link from 'next/link';
import { AlignJustify, Cross, Scale, Wallet, MapPinned } from 'lucide-react';
import { LogoutButton } from '../PainelPage/LogoutButton';
import { LogoutButtonMobile } from '../PainelPage/LogoutButtonMobile';
import { PiCow } from "react-icons/pi";
import { TbVaccine } from "react-icons/tb";

export default function Sidebar() {
  return (
    <nav>
      <div className='sm:hidden fixed z-50'>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='bg-[#303030]'><AlignJustify /></Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <div className="mt-4 text-2xl text-white font-semibold flex flex-col items-center">
                <Image className="w-8 h-8 mr-1" src={Logo} alt="connectFarm-logo" width={32} height={32} />
                <h1 className='text-white font-semibold text-lg'>ConnectFarm</h1>
              </div>
            </SheetHeader>
            <div className="grid gap-4 py-4 justify-center mt-4">
              <Link href="/painel" className="text-white hover:text-gray-300 mt-2 text-center">Financeiro</Link>
              <Link href="/painel/calves" className="text-white hover:text-gray-300 mt-2 text-center">Bezerros</Link>
              <Link href="/painel/vaccines" className="text-white hover:text-gray-300 mt-2 text-center">Vacinas</Link>
              <Link href="/painel/health" className="text-white hover:text-gray-300 mt-2 text-center">Saúde</Link>
              <Link href="/painel/weight" className="text-white hover:text-gray-300 mt-2 text-center">Peso</Link>
              <Link href="/painel/location" className="text-white hover:text-gray-300 mt-2 text-center">Localização</Link>
              <LogoutButtonMobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden sm:flex flex-col w-[15%] min-w-[200px] h-screen bg-[#303030] fixed`}>
        <div className="flex items-center justify-start w-full py-4 px-3">
          <Image className="w-8 h-8 mr-1" src={Logo} alt="connectFarm-logo" width={32} height={32} />
          <h1 className='text-white font-semibold text-lg'>ConnectFarm</h1>
        </div>
        <div className="flex flex-col justify-center w-full gap-4">
          <div className="flex w-full items-center justify-start pl-[20px]">
            <h2 className='text-[#8E8D8D] text-[8pt] font-bold'>OPTIONS</h2>
          </div>
          <div className="flex flex-col items-center justify-between w-full gap-3">
            <SidebarRoutes icon={Wallet} pageName="Financeiro" routeName="/painel" />
            <SidebarRoutes icon={PiCow} pageName="Bezerros" routeName="/painel/calves" />
            <SidebarRoutes icon={TbVaccine} pageName="Vacinas" routeName="/painel/vaccines" />
            <SidebarRoutes icon={Cross} pageName="Saúde" routeName="/painel/health" />
            <SidebarRoutes icon={Scale} pageName="Peso" routeName="/painel/weight" />
            <SidebarRoutes icon={MapPinned} pageName="Localização" routeName="/painel/location" />
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../shared/ui/sheet';
import { Button } from '../shared/ui/button';
import Link from 'next/link';
import { AlignJustify, FlaskRound } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/static/logo.png';

export default function Navbar() {
  return (
    <nav className="fixed w-full p-2 z-20">
      <div className='lg:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='bg-[#2D6432]'><AlignJustify /></Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <div className="mt-4 text-2xl text-white font-semibold flex flex-col items-center">
                <Image className="w-8 h-8 mr-1" src={Logo} alt="connectFarm-logo" width={32} height={32} />
                <h1 className='text-white font-semibold text-lg'>ConnectFarm</h1>
              </div>
            </SheetHeader>
            <div className="grid gap-4 py-4 justify-center mt-4">
              <Link href="/" className="text-white hover:text-gray-300 mt-2 text-center">Página inicial</Link>
              <Link href="/painel" className="text-white hover:text-gray-300 mt-2 text-center">Acessar Painel</Link>
              <Link href="/sales" className="text-white hover:text-gray-300 mt-2 text-center">Produtos</Link>
              <Link href="/register" className="text-white hover:text-gray-300 mt-2 text-center">Registrar</Link>
              <Link href="/login" className="text-white hover:text-gray-300 mt-2 text-center">Entrar</Link>
              <Link href="/demo" className="text-white hover:text-gray-300 text-center">
                <div className={`
                flex items-center py-2 pl-3 pr-4
                bg-[#404440] rounded-full
              `}>
                  <FlaskRound className="mr-2" />
                  <span>Acessar Demo</span>
                </div>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="container mx-auto hidden lg:flex lg:justify-end justify-around items-center">
        <div className={`
          flex px-5 gap-5 md:gap-20
          font-500 text-sm
        `}>
          <Link href="/" className="text-white hover:text-gray-300 mt-2">Página inicial</Link>
          <Link href="/painel" className="text-white hover:text-gray-300 mt-2">Acessar Painel</Link>
          <Link href="/sales" className="text-white hover:text-gray-300 mt-2">Produtos</Link>
          <Link href="/register" className="text-white hover:text-gray-300 mt-2">Registrar</Link>
          <Link href="/login" className="text-white hover:text-gray-300 mt-2">Entrar</Link>
          <Link href="/demo" className="text-white hover:text-gray-300">
            <div className={`
              flex items-center py-2 pl-3 pr-4
              bg-[#404440] rounded-full
            `}>
              <FlaskRound className="mr-2" />
              <span>Acessar Demo</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

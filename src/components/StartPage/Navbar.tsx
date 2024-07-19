import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../shared/ui/sheet';
import { Button } from '../shared/ui/button';
import { Label } from '../shared/ui/label';
import { Input } from '../shared/ui/input';
import Link from 'next/link';
import { IconUserFilled } from '@tabler/icons-react';
import { AlignJustify } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full p-2 z-20">
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

      <div className="container mx-auto hidden sm:flex sm:justify-end justify-around items-center">
        <div className={`
          flex px-5 gap-5 md:gap-20
          font-500 text-sm
        `}>
          <Link href="/" className="text-white hover:text-gray-300 mt-2">Página inicial</Link>
          <Link href="/painel" className="text-white hover:text-gray-300 mt-2">Assinar Painel</Link>
          <Link href="/register" className="text-white hover:text-gray-300 mt-2">Registrar</Link>
          <Link href="/login" className="text-white hover:text-gray-300 mt-2">Entrar</Link>
          <Link href="#" className="text-white hover:text-gray-300">
            <div className={`
              flex items-center py-2 pl-3 pr-4
              bg-[#404440] rounded-full
            `}>
              <IconUserFilled className="mr-2" />
              <span>Contato</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

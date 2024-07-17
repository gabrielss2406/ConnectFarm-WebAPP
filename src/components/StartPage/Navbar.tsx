import { IconUserFilled } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed w-full p-2 z-20">
      <div className="container mx-auto flex sm:justify-end justify-around items-center">
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

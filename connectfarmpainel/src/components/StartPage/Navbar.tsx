import { IconUserFilled } from '@tabler/icons-react';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed w-full p-2">
      <div className="container mx-auto flex sm:justify-end justify-around items-center">
        <div className={`
          flex px-5 gap-5 md:gap-20
          font-500 text-sm
        `}>
          <a href="/" className="text-white hover:text-gray-300 mt-2">Página inicial</a>
          <a href="#" className="text-white hover:text-gray-300 mt-2">Assinar Painel</a>
          <a href="#" className="text-white hover:text-gray-300 mt-2">Registrar</a>
          <a href="/login" className="text-white hover:text-gray-300 mt-2">Entrar</a>
          <a href="#" className="text-white hover:text-gray-300">
            <div className={`
              flex items-center py-2 pl-3 pr-4
              bg-[#404440] rounded-full
            `}>
              <IconUserFilled className="mr-2" />
              <span>Contato</span>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
};

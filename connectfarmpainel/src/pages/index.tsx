import CardGroup from '@/components/StartPage/CardGroup';
import Navbar from '@/components/StartPage/Navbar';
import { IconArrowNarrowDown } from '@tabler/icons-react';

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-40 min-h-screen bg-[#2a2a2a]">
        <div className={`
          min-h-screen flex flex-col items-center justify-center
          radial-startpage-gradient gap-5
        `}>
          <div className="mt-4 text-6xl font-semibold">
            ConnectFarm
          </div>
          <div className="text-md font-semibold">
            Painel de análises
          </div>
          <div className="mt-4">
            <button className={`
              flex pl-5 pr-2 py-2
              bg-[#A2CE9B] rounded-full
              hover:bg-[#61d250]
              group
            `}>
              <div className="flex items-center gap-2">
                <h1 className="text-black font-semibold text-sm">
                  Começar
                </h1>
                <div className='bg-white rounded-full group-hover:bg-[#c7d4c5]'>
                  <IconArrowNarrowDown color='black' />
                </div>
              </div>
            </button>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-20 justify-center items-center'>
            <div className='text-5xl font-semibold'>
              Nossos serviços
            </div>
            <CardGroup />
          </div>
        </div>
        <br/><br/><br/>
      </div>
    </div>
  );
}
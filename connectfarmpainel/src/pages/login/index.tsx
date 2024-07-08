import CardGroup from '@/components/StartPage/CardGroup';
import Navbar from '@/components/StartPage/Navbar';
import LoginForm from '@/forms/LoginForm';
import Image from "next/image"

export default function About() {
  return (
    <div>
      <Navbar />
      <div className=" min-h-screen bg-[#2a2a2a] flex items-center justify-center">
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderLeft: '45vw solid transparent',
          borderTop: '100vh solid rgba(69, 181, 58, 0.50)',
          zIndex: 0
        }}
      />
        <div className='bg-white flex flex-row flex-wrap columns-2 w-max items-center bg-opacity-65 z-10'>
          <Image src={"/login/login_background.png"} alt="Login Background" width={400} height={100} className='w-1/2'/>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
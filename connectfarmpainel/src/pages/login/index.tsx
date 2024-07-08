import CardGroup from '@/components/StartPage/CardGroup';
import Navbar from '@/components/StartPage/Navbar';
import LoginForm from '@/forms/LoginForm';
import Image from "next/image"

export default function About() {
  return (
    <div>
      <Navbar />
      <div className=" min-h-screen bg-[#2a2a2a] flex items-center justify-center ">
        <div className='bg-white flex flex-row flex-wrap columns-2 w-max items-center bg-opacity-65'>
          <Image src={"/login/login_background.png"} alt="Login Background" width={400} height={100} className='w-1/2'/>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
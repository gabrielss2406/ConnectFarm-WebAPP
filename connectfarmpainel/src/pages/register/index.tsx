import Navbar from '@/components/StartPage/Navbar';
import RegisterForm from '@/forms/RegisterForm';

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
        <div className='bg-white bg-opacity-65 z-10'>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
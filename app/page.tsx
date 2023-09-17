import Image from 'next/image'
import Circle from './assets/circle.svg';
import Sun from './assets/sun.svg';
import  Button from './components/button'


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="sun-wrapper w-full h-[100vh] relative flex flex-col items-center justify-center">
            <div className="relative">
                <Image id="sun" src={Sun} alt="sun"/>
                <Image className="animate-logo_kinetics absolute top-[15px] left-[15px]" id="circle" src={Circle} alt="circle"/>
            </div>
            <div className="absolute w-[140%] h-[200px] rounded-[50%] bg-[#ffffff] top-[-40px]"></div>
            <Button/>
        </div>
    </main>
  )
}

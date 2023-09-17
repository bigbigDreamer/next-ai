'use client'

import {FC, useState} from "react";
import Image from "next/image";
import  { useRouter } from "next/navigation";
import Rocket from "@/app/assets/rocket.png";

const Button: FC = () => {

    const [up, setStatus] = useState(false)
    const router = useRouter()

    const handleClick = () => {
        setStatus(pre=> !pre)
        setTimeout(() => {
            setStatus(pre => !pre)
            if(!localStorage.getItem('COMMON_AI_AUTH_KEY')) {
                router.push('/passport')
            } else {
                router.push('/gpt')
            }

        }, 1000);
    }
    return (
        <>
            <Image className={`${up ? 'animate__backOutUp' : 'hidden'} animate__animated absolute top-[50%] mt-[80px]`} width={65} height={80} src={Rocket} alt="rocket" />
            <div onClick={handleClick} className={`mt-[80px] text-[#597ef7] flex items-center justify-center w-[150px] p-[12px] rounded-[28px] pt-[6px] pb-[6px] border-[#adc6ff] border-solid border-[1px] ${up ? 'invisible' : 'visible'}`}>即刻出发</div>
        </>
    )
}

export  default Button;

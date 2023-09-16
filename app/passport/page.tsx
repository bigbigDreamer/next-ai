'use client';
import {EventHandler, FC, useEffect, useRef, useCallback} from "react";
import { Input, InputRef, Alert, message } from 'antd';
import { CirclesWithBar } from  'react-loader-spinner'
import  { debounce } from 'lodash-es'
import { useRouter } from 'next/navigation'

import useValidate from './use-validate'

const Passport: FC = () => {

    const inputRef = useRef<InputRef>(null)
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            inputRef.current!.focus();
        }, 200);
    }, [])

    const valid = useValidate()

    const handleChange: EventHandler<any> = useCallback(debounce((e) => {
        const value = e.target.value;
        console.log(value)

        valid(value)
            .then(res => {
                if(res) {
                    localStorage.setItem('COMMON_AI_AUTH_KEY', res)
                    message.success('指令正确，即将进入系统')
                        .then(() => {
                            router.push('/gpt')
                        })
                } else {
                    message.error('指令错误，请重新输入')
                }
            })
    }, 800), [])

    return (
        <div className="w-[100%] h-[100vh] flex items-center justify-center flex-col p-[50px]">
            <Alert className="self-start" message={
                <div className="flex justify-items-start flex-col">
                    <p>尊敬的宙斯大人，您好：</p>
                    <p className="indent-8 mt-[12px] mb-[24px]">我是阿波罗，如需进入系统，您务必向其他星球的大人一样先输入指令方可使用系统！</p>

                    <Input.TextArea onChange={handleChange} ref={inputRef} placeholder={"请输入启动指令"} className={"mt-[5px] opacity-50"}/>
                </div>
            } type="info"  />
            <div className='mb-[100px]'/>
            <CirclesWithBar
                height="200"
                width="200"
                color="#85a5ff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel='circles-with-bar-loading'
            />
        </div>
    )
}

export default  Passport

'use client'
import React, {type FC, ReactNode, useState, useRef, useLayoutEffect } from "react";
import { Watermark, List, Avatar, Input, Button, InputRef } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import {type SearchProps} from "antd/es/input";
import  { produce } from 'immer';
import { Dna } from  'react-loader-spinner'
import useWatchMessage from './use-watch-message'
import useGpt from "@/app/gpt/use-gpt";
import  { useRouter } from 'next/navigation'
import Image from 'next/image'

import  Zeus from '../assets/zeus.png'
import God from '../assets/god.png'
import Egg from '../assets/egg.webp'

import  './gpt.css'

type MessageList = {
    name: string;
    message: string | ReactNode;
    role: 'system' | 'user';
    isEgg?: boolean;
}[]

const roleAvatar = {
    system: <Image width={48} height={48} src={God} alt="1"/>,
    user:  <Image width={48} height={48} src={Zeus} alt="1"/>,
}

const Gpt: FC = () => {

    const [messageList, setMessageList] = useState<MessageList>([])
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<InputRef>(null)
    useWatchMessage(messageList);

    const router = useRouter()

    useLayoutEffect(() => {
        if(!localStorage.getItem('COMMON_AI_AUTH_KEY')) {
            router.push('/passport')
        }
    }, [])

    const fetch = useGpt();

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1677ff',
            }}
        />
    );

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setMessageList(produce(draft => {
            draft.push({
                role: 'user',
                message: value,
                name: '宙斯'
            })
            if(value === '1024') {
                draft.push({
                    role: 'system',
                    message: (
                        <div className="flex items-start flex-col">
                            <Image className="rounded-[16px]" width={200} alt="1" height={400} src={Egg}/>
                            <span className="mt-[4px] text-amber-500">彩蛋时刻！宙斯，视觉疲劳了吗？来放松一下吧！</span>
                        </div>),
                    isEgg: true,
                    name: '阿波罗'
                })
            }
            draft.push({
                role: 'system',
                message: (
                    <div className="flex items-center">
                        <Dna
                            visible={true}
                            height="50"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                         />
                        思考中
                    </div>),
                name: '阿波罗'
            })
        }))
        setLoading(true);
        fetch(value)
            .then(res => {
                console.log(res, "error")
                setMessageList(produce(draft => {
                    draft.forEach(item => {
                        if(typeof item.message !== 'string' && !item.isEgg) {
                            item.message = res
                        }
                    })
                }))
            })
            .catch((error) => {
                setMessageList(produce(draft => {
                    draft.forEach(item => {
                        if(typeof item.message !== 'string' && !item.isEgg) {
                            item.message = <div className="text-red-600">{error.error}</div>
                        }
                    })
                }))
            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => {
                    // 自动聚焦对于移动端体验不好
                    // inputRef.current?.focus?.();
                }, 200)
            })
    };
    return (
        <div className="w-[100%] h-[100vh]">
            <div className="chat-header">{loading ? '正在输入中......' : '太阳神·阿波罗'}</div>
            <Watermark content="圣·Olympia">
                <div className="chat-container">
                    <List
                        locale={{ emptyText: '宙斯来聊聊吧，不要羞涩！' }}
                        itemLayout="horizontal"
                        dataSource={messageList}
                        renderItem={({message, name, role}, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    className={index === messageList.length -1  ? 'need-scroll-to-end' : ''}
                                    avatar={<Avatar src={roleAvatar[role]} />}
                                    title={name}
                                    description={message}
                                />
                            </List.Item>
                        )}
                    />

                </div>
            </Watermark>
            <div className="chat-footer">
                <Input.Search
                    ref={inputRef}
                    key={loading ? Math.random() : undefined}
                    placeholder="👋 说点什么吧！"
                    enterButton="发送"
                    size="large"
                    suffix={suffix}
                    loading={loading}
                    onSearch={onSearch}
                />
            </div>
        </div>
    )
}

export  default  Gpt;

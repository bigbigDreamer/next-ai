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

import  './gpt.css'

type MessageList = {
    name: string;
    message: string | ReactNode;
    role: 'sys' | 'user';
}[]

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
            draft.push({
                role: 'sys',
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
                name: '阿波罗大人'
            })
        }))
        setLoading(true);
        fetch(value)
            .then(res => {
                console.log(res, "error")
                setMessageList(produce(draft => {
                    draft.forEach(item => {
                        if(typeof item.message !== 'string') {
                            item.message = res
                        }
                    })
                }))
            })
            .catch((error) => {
                setMessageList(produce(draft => {
                    draft.forEach(item => {
                        if(typeof item.message !== 'string') {
                            item.message = <div className="text-red-600">{error.error}</div>
                        }
                    })
                }))
            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => {
                    inputRef.current?.focus?.();
                }, 200)
            })
    };
    return (
        <div className="w-[100%] h-[100vh]">
            <div className="chat-header">太阳神·阿波罗</div>
            <Watermark content="AI GPT">
                <div className="chat-container">
                    <List
                        locale={{ emptyText: '宙斯来聊聊吧，不要羞涩！' }}
                        itemLayout="horizontal"
                        dataSource={messageList}
                        renderItem={({message, name}, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    className={index === messageList.length -1  ? 'need-scroll-to-end' : ''}
                                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
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
                    placeholder="今天午饭吃什么呢？"
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

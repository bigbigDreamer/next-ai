import {ChatGPTAPI, ChatGPTError} from "chatgpt";
import { NextResponse, type NextRequest } from 'next/server'


const apiKey = process.env.OPENAI_API_KEY || 'xxxxxx'
const baseUrl = ((process.env.OPENAI_API_BASE_URL) || 'https://api.openai.com').trim().replace(/\/$/, '')
const model = process.env.MODEL || 'gpt-3.5-turbo'
const api = new ChatGPTAPI({
    apiKey: apiKey,
    apiBaseUrl: `${baseUrl}/v1`,
    completionParams: {
        model: model,
        temperature: 0.5,
        top_p: 0.8
    }
})
export async function POST(req: NextRequest) {
    try {
        const reqJson = await req.json()
        const result = await api.sendMessage(reqJson.payload, reqJson.chatId ? { parentMessageId: reqJson.chatId, timeoutMs: 20 * 60 * 1000 } : {
            timeoutMs: 20 * 60 * 1000,
        });
        return NextResponse.json({ result, chatId: result.id })
        // @ts-ignore
    } catch (err: ChatGPTError) {
        console.log(err, 'err')
        return NextResponse.json({ error: err.statusText || err.message }, { status: 500 })
    }
}

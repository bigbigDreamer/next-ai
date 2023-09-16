import {ChatGPTAPI, ChatMessage, ChatGPTError} from "chatgpt";
import { NextResponse, type NextRequest } from 'next/server'


const apiKey = process.env.OPENAI_API_KEY || ''
const baseUrl = ((process.env.OPENAI_API_BASE_URL) || 'https://api.openai.com').trim().replace(/\/$/, '')
const model = process.env.MODEL || 'gpt-3.5-turbo'

export async function POST(req: NextRequest) {
    const api = new ChatGPTAPI({
        apiKey,
        apiBaseUrl: `${baseUrl}/v1`,
        completionParams: {
            model: model
        }
    })
    try {
        const reqJson = await req.json()
        const result = await api.sendMessage(reqJson.payload);
        return NextResponse.json({ result  })
        // @ts-ignore
    } catch (err: ChatGPTError) {
        return NextResponse.json({ error: err.statusText || err.message }, { status: 500 })
    }
}

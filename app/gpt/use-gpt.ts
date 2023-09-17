
import {useCallback, useRef} from "react";

function useGpt() {
    const chatQueueId = useRef(null);
    const chat = useCallback(async (value: string) => {
        const controller = new AbortController()
        try {
            const response = await fetch('/api/gpt', {
                method: 'POST',
                body: JSON.stringify({
                    payload: value,
                    chatId: chatQueueId.current
                }),
                signal: controller.signal,
            })

            const resJson = await response.json();
            if(!response.ok) {
                return Promise.reject(resJson)
            }
            if(!chatQueueId.current) {
                chatQueueId.current = resJson.chatId
            }

            return resJson.result?.text
        } catch (e) {
            throw e;
        }

    }, []);

    return chat;
}

export default useGpt

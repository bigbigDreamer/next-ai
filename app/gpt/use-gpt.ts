
import {useCallback} from "react";

function useGpt() {
    const chat = useCallback(async (value: string) => {
        const controller = new AbortController()
        try {
            const response = await fetch('/api/gpt', {
                method: 'POST',
                body: JSON.stringify({
                    payload: value
                }),
                signal: controller.signal,
            })

            const resJson = await response.json();
            if(!response.ok) {
                return Promise.reject(resJson)
            }

            return resJson.result?.text
        } catch (e) {
            throw e;
        }

    }, []);

    return chat;
}

export default useGpt

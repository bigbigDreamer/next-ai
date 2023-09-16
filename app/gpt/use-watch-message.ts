import { useEffect } from "react";
import scrollIntoView from "scroll-into-view-if-needed";

function useWatchMessage(data: any) {

    useEffect(() => {
        const node = document.querySelector('.need-scroll-to-end')
        if(node) {
            scrollIntoView(node as HTMLElement, {
                scrollMode: 'if-needed',
                block: 'end',
                inline: 'nearest',
            })
        }
    }, [data]);

}

export  default useWatchMessage

import {useCallback} from "react";
function useValidate() {
    return useCallback(async (value: string) => {
        const response = await fetch(`/api/passport?${new URLSearchParams({payload: value})}`, {
            method: 'GET',
        })

        if(response.ok) {
            const resJson = await response.json();

            console.log(resJson, 'opopop')

            return resJson.status;
        }

        return false

    }, []);
}

export default useValidate

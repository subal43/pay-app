import { useEffect, useState } from "react";

export function useDebounce(value,Timeout){
    const [debouncedValue , setDebouncedValue] = useState(value);
    useEffect(()=>{
        let timeoutNumber = setTimeout(()=>{
            setDebouncedValue(value);
        },Timeout);
        return ()=>{
            clearTimeout(timeoutNumber);
        }
    },[value])
    return debouncedValue ;
}
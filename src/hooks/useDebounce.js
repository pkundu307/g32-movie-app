import { useState,useEffect, use } from "react";

export function useDebounce (value,delay=500){
    const [debounced,setDebounced]= useState(value);

    useEffect(()=>{
        const  timer = setTimeout(()=>setDebounced(value),delay);
        return ()=> clearTimeout(timer);
    },[value,delay])

    return debounced;
}

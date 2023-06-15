import { useEffect, useState } from "react"

export function useWindowSize() {
    const [size, setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
      })
    
      const handleResize = ()=>{
        setSize({
          width:document.documentElement.clientWidth,
          height:document.documentElement.clientHeight
        })
      }
      
      useEffect(()=>{
        window.addEventListener('resize',handleResize)
        return ()=>{
          window.removeEventListener('resize', handleResize)
        }//close event
    
      },[])//默认执行一次
      return [size]
}
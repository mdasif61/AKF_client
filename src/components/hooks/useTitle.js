import { useEffect } from "react"

const useTitle=(title)=>{
    useEffect(()=>{
        document.title=`${title} -AKF`
    },[title])
}

export default useTitle;
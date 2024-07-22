import React, { useEffect , useState } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


// Note : "file name and function name" can be different. It is allowed

export default function Protected({children , authentication = true}) {  
    
    const navigate = useNavigate()
    const [loader , setLoader] = useState(true) // values fetch krte time jo time lagega uss doraan hamm 'Loading' likha hua user ko show krwadenge "UI" mai jisse user experience acha ho user ko acha lage WITH the help of This "useState" hook
    const authStatus = useSelector( (state) => state.auth.status )

    useEffect(() => {

        // TODO : make it more easy to understand

        // if (authStatus === true) {
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        // let authValue = authStatus === true ? true : false
        // iske niche jo bhi likha hai uska and iska mean same hee hai bss ye thora easy hai


        // Suppose user ne authentication 'true' bheja hai but actual mai hamara 'authStatus' false aa rhe hai it means user login nhi hai 
            // true && false !== true
                // true && true => "overall true" aaya result mtlb ki user is 'not logged in' too isko login krne ke liye 'login' wale page par navigate krwado
        if(authentication && authStatus !== authentication) {
            navigate("/login")
        }

            // suppose user has sent 'authentication = false' then : 
            // !authentication = true
            // true && true !== false
            // true && true => overall true hai it means ki user is already 'Logged-in' so user ko 'home-page' par redirect krwado
        else if(!authentication && authStatus !== authentication) {
            navigate("/")  // mtlb ki user is "logged-in" so isko home page par navigate krwado
        }
        setLoader(false)
    } , [authStatus , navigate , authentication])
    

  return loader ? <h1>Loading...</h1> : <>{children}</>

  
}


import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import authService from "../appwrite/auth"
import {Button , Input ,Logo} from "./index"
import {useDispatch} from "react-redux"  // Store mai updatation krne ke liye isko use krte hai
import {login as storeLogin} from '../store/authSlice'
import {useForm} from "react-hook-form"


function Login() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError] = useState("")


    const {register, handleSubmit} = useForm()  // 'handlesubmit' apne aap mai ekk method hai jo ki apne andar ekk method leta hai. niche dekh lena form ke 'onSubmit' par. AND haa ye 'handleSubmit' ekk keyword bhi hai and ekk event bhi hai. so hamm hamare koi bhi method ko yehh naam nhi de skte hai.
    // with the help of this handle submit => input fields mai hamne 'register' bhi de rkha hai so jab hamm hamamre form ke andar input fields ko fill krenge too ukse baad jab bhi hamm form ko submit krenge tab hame hamare state ko manage krne ki jrurat nhi hai ye apne aap 'register' ke andar values lega and 'handleSumit' ke time apne aap values ko handle krlega



    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(storeLogin(userData));
                navigate("/")  // Navigate => Forcefully uss page par bhej deta hai without click. BUT 'Link' => ke anadar hamm agr click krte hai tabhi uss page par jata hai jiski link de rkhi hoti hai
            }
        } catch (error) {
            setError(error.message)
        }
    }




  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login




// Note : ye niche wala jo bhi likha hai '...register' wagara ye bss syntax hai ese likhna hee padega agr hamko 'react-hook-form ko use krna hai too.

// iss '...register' ke anadr 2 parameters aate hai : 
// 1. `key`
// 2. `options` (yeh optional hai). Niche dekho agr 2nd parameter mai itni values nhi leni hai too hamm sirf ekk single value bhi le skte hai Ex : "{required: true}"  . YEH NICHE TOO BSS ESE HEE CODE COPY paste kiya hai email waale input sai

// NOTE : niche validate ke andar 'matchPatern' iske anadar callback ke anadr jo kuch bhi likha hai isse 'regEx'(Regular expression) kehte hai. HAMM kiskika bhi 'regEx' generate krr skte hai. google par search krlena. 

// {...register("email", {
//     required: true,
//     validate: {
//         matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//         "Email address must be a valid address",
//     }
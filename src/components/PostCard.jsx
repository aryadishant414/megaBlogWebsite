import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id , title , featuredImage}) {
  
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'> 
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />
            </div>
            <h2 className='text-xl font-bold'>
                {title}
            </h2>
            </div>
        </Link>
  )

}

export default PostCard

// Note : in the upper code 'PostCard' ke andar jo first parameter likha hua hai "$id" its a "Variable Name" iske paramter mai SYNTAX hai isko ese hee likhna pdta hai. And jo second time hammne 'Link' ke andar use kiya hai wo bhi syntax ka heee partt hai

// NOTE : ChatGPT too bata rha tha ki ye developer ki choice thi ki wo '($)' sign ko sirf 'id' ke aage use krr rha hai in "PostCard" ke parameters mai BUT AGR HAMM CHHAHE TOO HAMM SABKE AAGE Dollar laga skte hai coz sabhi variables hee hai jo ki user apne components ke CALLING  ke time unke arguments mai as a 'props' send krr rha hai.
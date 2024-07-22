import React from 'react'
import {Signup as SignupComponent} from '../index'  // isko import ka path components diya hai mtlb ki ye Apne aap index file dekh lega and usme sai import krwa dega 'Signup' component ko

// import {Signup as SignupComponent} => MTLB Ki'Signup' ko hamm iss file mai `SignupComponent` bolenge. Hamm confuse na ho islie hamne esa kiya hai baaki kuch nhi

function Signup() {
  return (
    <div className='py-8'>
        <SignupComponent />
    </div>
  )
}

export default Signup
"use client"
import { login } from '@/services/userServices'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { toast } from 'react-toastify'

const Login = () => {
    const router = useRouter();

    const [user,setUser] = useState({
        email:"",
        password:""
    })

    async function loginUser(e) {
        e.preventDefault();

        try {
            const result = await login(user);
            // console.log(result);
            if (result.data.success) {
                router.push('/profile/user')
                toast.success(("Login Success !!"),{position:"top-center"});
            }
            else{
                toast.warning(("Login Failed !!"),{position:"top-center"});
            }
        } catch (error) {
            toast.error("Network Error", {
            position:"top-center"
            })
        }

    }
    
    return (
    <div className='grid grid-cols-12'>
        <div className='col-span-4 col-start-5 border-r-emerald-300'>
        <div className='py-5'>
            
            <div className='flex justify-center m-4'>
                {/* <Image style={{width:"40%", height:"40%"}} src={""} alt="sign-up" priority/> */}
            </div>
            
            <h1 className='text-3xl text-center'>Login Here</h1>

            {/* form */}

            <form action='#' onSubmit={(e) => loginUser(e)}>
            

                <div className="mt-5">
                    <label htmlFor="user_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" 
                    onChange={(e) => setUser({...user, email:e.target.value})}
                    value={user.email}

                    name="user_email" id="user_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john@gmail.com" required/>
                </div>

                <div className="mt-5">
                    <label htmlFor="user_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password"
                    onChange={(e) => setUser({...user, password:e.target.value})}
                    value={user.password}
                    name="user_password" id="user_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required/>
                </div>

                <div className='mt-3 flex justify-around'>
                    <button type='submit' className='px-2 py-3 bg-green-600 rounded hover:bg-green-400'>Login-up</button>
                    <button className='px-2 py-3 bg-orange-600 rounded hover:bg-orange-400'>Reset</button>              
                </div>
            </form>
        </div>
        </div>
    </div>
    )
}

export default Login
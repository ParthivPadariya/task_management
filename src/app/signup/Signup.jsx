"use client"
import Image from 'next/image'
import React, { useState } from 'react'

import signup from '@/assets/signup.svg'

import {SignUp} from '@/services/userServices'
import { toast } from 'react-toastify'

const Signup = () => {

  const [user,setUser] = useState({
    name: "",
    email:"",
    password:"",
    about:"Hii, ",
    profileURL:"https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=",
  })

  async function createUser(e) {
    e.preventDefault();

    // verify

    // create user
    // console.log(user);

    try {
      const result = await SignUp(user);
      console.log(result);
      if (result.data) {
        toast.success("User Created", {
          position:"top-center"
        })
      }
      else{

        toast.warning("Invalid Email", {
          position:"top-center"
        })
      }
    } catch (error) {
      toast.error("User Not Created", {
        position:"top-center"
      })
    }

  }
  
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-4 col-start-5 border-r-emerald-300'>
        <div className='py-5'>
          
          <div className='flex justify-center m-4'>
            <Image style={{width:"40%", height:"40%"}} src={signup} alt="sign-up" priority/>
          </div>
          
          <h1 className='text-3xl text-center'>Signup Here</h1>

          {/* form */}

          <form action='#' onSubmit={(e) => createUser(e)}>
            <div className="mt-5">
                <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" 
                name="user_name" 
                value={user.name}
                onChange={(e) => {setUser({...user, name: e.target.value})}}
                id="user_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required/>
            </div>

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

            <div className="mt-5">
                <label htmlFor="user_about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
                <textarea rows={5} 
                onChange={(e) => setUser({...user, about:e.target.value})}
                value={user.about}
                type="text" 
                
                name="user_about" id="user_about" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="About" required > </textarea>
            </div>

            <div className='mt-3 flex justify-around'>
              <button type='submit' className='px-2 py-3 bg-green-600 rounded hover:bg-green-400'>Sign-up</button>
              <button className='px-2 py-3 bg-orange-600 rounded hover:bg-orange-400'>Reset</button>              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
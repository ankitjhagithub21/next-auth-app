"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (event: any) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const userData = Object.fromEntries(formData.entries())

    setIsLoading(true)

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)

      })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message)
        router.push("/login")
      } else {
        toast.error(data.error)
      }

    } catch (error) {
      console.log(error)
      toast.error("Error.")
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='lg:w-1/4 md:w-1/2 w-full  p-5 rounded-xl'>
        <img src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png" alt="user" className='mx-auto mb-5' width={70} />
        <h2 className='mb-5 text-xl text-center'>Create an account</h2>
        <form className='flex flex-col gap-3' onSubmit={handleSignUp}>


          <label className="input input-primary flex items-center gap-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" className="grow" placeholder="Enter email" name='email' required />
          </label>
          <label className="input input-primary flex items-center gap-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Enter username" name='username' required />
          </label>
          <label className="input input-primary flex items-center gap-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" placeholder='Enter password' className="grow" name='password' required />
          </label>
          <button type='submit' disabled={isLoading} className='btn btn-primary  rounded-full'>
            {
              isLoading && <span className="loading loading-spinner"></span>
            }
            Sign Up</button>
        </form>
        <p className='mt-5 text-center'>Already have an account ? <Link className='underline text-primary' href={"/login"}>Login</Link>  </p>
      </div>
    </div>
  )
}

export default page

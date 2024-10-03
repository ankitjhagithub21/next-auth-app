"use client"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast"

const page = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const token = searchParams.get('token')

  

    const verifyEmail = async () => {
       if(token){
        try {
            const res = await fetch("/api/users/verifyemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token })
            })
            const data = await res.json()

            if (res.ok) {
                
                toast.success(data.message)
                router.push("/")
            }else{
                toast.error(data.error)
                
            }
        } catch (error) {
            toast.error("Error.")
            console.log(error)
        }
       }else{
         toast.error("You are not verified.")
       }
    }


    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <h1 className='text-2xl'>Verify Email</h1>
            <button className="btn btn-primary mt-5" onClick={verifyEmail}>Verify</button>
        </div>
    )
}

export default page

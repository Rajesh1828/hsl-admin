import React, { useState } from 'react'
import axios from 'axios'
import { backend_url } from '../App';
import { toast } from 'react-toastify';




const Login = ({setToken}) => {

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
 const onSubmitHandler = async(e)=>{
     try {
        e.preventDefault(); 
   const response = await axios.post(backend_url +  "/api/admin/login", {email, password});
   if(response.data.success){
       setToken(response.data.token)
       toast.success(response.data.message)
   }
   else{
    toast.error(response.data.message)
   }
     } catch (error) {
        console.log(error);
        toast.error(error.message)
        
     }
 }

    return (
        <div className=' min-h-screen flex items-center justify-center' style={{
            backgroundImage:`url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat'
        }}>
            <div className="flex flex-col bg-white/70 gap-5 p-8 rounded-lg shadow-md min-w-[300px]">
                <h2 className='text-2xl font-bold text-center text-gray-800'>Admin Panel</h2>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-4 '>
                        <p className='text-sm font-medium text-gray-900  mb-1'>Email-Address</p>
                        <input onChange={(e)=>setEmail(e.target.value)} type='email'
                            className='w-full px-4 py-2 border  rounded-md '
                            placeholder='Email-Address'
                            required
                        />
                    </div>
                    <div className='mb-4 '>
                        <p className='text-sm font-medium text-gray-900  mb-1'>Email-Address</p>
                        <input onChange={(e)=>setPassword(e.target.value)} type='password'
                            className='w-full px-4 py-2 rounded-md  '
                            placeholder='Password'
                            required
                        />
                    </div>

                    <button
                        className="bg-gray-600 hover:bg-gray-700 transition text-white w-full py-2 rounded-full"
                        type="submit"
                    >
                        Login
                    </button>
                </form>


            </div>

        </div>
    )
}

export default Login
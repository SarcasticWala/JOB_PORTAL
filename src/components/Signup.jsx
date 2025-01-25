import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accType, setAccType] = useState("employee")
  const navigate = useNavigate()

  const accTypeChange = (accType) => {
    if(accType=="employee"){
      setAccType("hr")
    }
    if(accType=="hr"){
      setAccType("employee")
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async(data) => {
    if(data.password!=data.Cpassword){
      toast.error('Password Not Same', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return
    }

    data.accountType = accType
    console.log(data)

    let response = await fetch("http://localhost:3000/auth/sendOtp",{
      method: 'POST',
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: data.email})
    },)
    
    response = await response.json()
    console.log(response)
    if(response.success === true){
      navigate('/verify-email',{ state: {data: data}})
    }

    setAccType("employee")
    reset();
  }

  return (
    <>

      <main className=' flex justify-center items-center flex-col mx-auto mb-5 '>
        <h1 className=' text-[#00a264] text-5xl font-semibold mt-6 mb-5 '>Welcome to JobPro </h1>
        <p className='text-center text-xl mb-3 '>Create Your Account</p>

        <div className=' flex p-1 gap-x-1 mb-2 rounded-full max-w-max bg-[#eaeaea] '>
          <button onClick={()=>accTypeChange(accType)} className={`${accType=="employee"?" bg-black text-white":""} py-2 px-5 rounded-full transition-all duration-200`}>Employee</button>
          <button onClick={()=>accTypeChange(accType)} className={`${accType=="hr"?" bg-black text-white":""} py-2 px-5 rounded-full transition-all duration-200`}>HR</button>
        </div>

        <div className=' w-1/5'>
          <form action='' onSubmit={handleSubmit(onSubmit)}>
            <label>
              <p>First Name</p>
              <input {...register("firstName")} className=' w-full border-2 rounded-md border-gray-400 p-2 mb-2' type="text" placeholder="Enter first name" />
            </label>

            <label>
              <p>Last Name</p>
              <input {...register("lastName")} className=' w-full border-2 rounded-md border-gray-400 p-2 mb-2' type="text" placeholder="Enter last name" />
            </label>

            <label>
              <p>Email Address</p>
              <input {...register("email")} className=' w-full border-2 rounded-md border-gray-400 p-2 mb-2' type="text" placeholder="Enter email address" />
            </label>

            <label>
              <p>Create Password</p>
              <div className=' relative flex items-center '>
                <input {...register("password")} className=' w-full border-2 rounded-md border-gray-400 p-2 mb-2' type={showPassword?"text":"password"} placeholder="Create Password" />
                {showPassword ? (
                  <span onClick={()=>setShowPassword((prev)=>!prev)} className=" absolute right-1  cursor-pointer material-symbols-outlined text-[#AFB2BF] text-[23px] ">visibility_off</span>
                ) : (
                  <span onClick={()=>setShowPassword((prev)=>!prev)} className=" absolute right-1  cursor-pointer material-symbols-outlined text-[#AFB2BF] text-[23px] ">visibility</span>
                )}
              </div>
            </label>

            <label>
              <p>Confirm Password</p>
              <div className=' relative flex items-center '>
                <input {...register("Cpassword")} className=' w-full border-2 rounded-md border-gray-400 p-2 mb-2' type={showConfirmPassword?"text":"password"} placeholder="Confirm password" />
                {showConfirmPassword ? (
                  <span onClick={()=>setShowConfirmPassword((prev)=>!prev)} className=" absolute right-1  cursor-pointer material-symbols-outlined text-[#AFB2BF] text-[23px] ">visibility_off</span>
                ) : (
                  <span onClick={()=>setShowConfirmPassword((prev)=>!prev)} className=" absolute right-1  cursor-pointer material-symbols-outlined text-[#AFB2BF] text-[23px] ">visibility</span>
                )}
              </div>
            </label>

            <div>
              <input disabled={isSubmitting} type='submit' value="Submit" className=' w-full py-3 mt-8 rounded-md bg-black text-white text-center text-[18px] hover:bg-[#00a264] transition-all duration-300 cursor-pointer'/>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default Signup

import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email.trim() === "") {
            return;
        }

        const toastId = toast.loading("loading...");
        try {
            let res = await fetch("http://localhost:3000/auth/verifyEmail", {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body : JSON.stringify({email}),
            })

            let response = await res.json();
            console.log(response);

            if(response.success) {
                toast.dismiss(toastId);
                navigate("/verify-otp", {state : {data : {email : email}}});
            }
            else{
                toast.update(toastId, {render: response.message, type: 'error'});
            }
        } catch (error) {
            toast.update(toastId, {render: "Something went wrong", type: 'error'});
            console.log(error);
        }
        finally {
            toast.dismiss(toastId);
        }
    }
    
    return (
        <div className='flex justify-center items-center h-[calc(100vh-3rem)]'>
            <div className='w-1/3  border border-gray-400 px-8 py-6 rounded-md'>
                <form className='flex flex-col'>
                    <label>
                        <p className='font-semibold text-2xl'>Email<span className='text-red-500'>*</span></p>
                        <input
                            required
                            type="email" 
                            className='border h-[40px] px-2 w-full border-gray-500 rounded-md mt-3'
                            placeholder='Enter your email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className='self-end mt-5 bg-black hover:bg-[#00a264] text-white px-4 py-2 rounded-md transition-all duration-300'
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
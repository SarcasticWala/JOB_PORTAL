import { useEffect, useState } from "react"
import OTPInput from "react-otp-input"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const navigate = useNavigate()

    let data = location.state?.data;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(otp);
        data.otp = otp;
        console.log(data)
        
        let response = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        response = await response.json()
        console.log(response)
        
        if(response.success === true){
            toast.success('Account Created Succesfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            navigate("/")
        }
    }
    return (
    <>
        <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
            <div className="w-1/4">
                <h1 className="text-2xl font-semibold">Verify Email</h1>
                <p className="text-lg my-2 leading-5">
                    A verification code has been sent to you. Enter the code below
                </p>
                <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-y-6">
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => (
                            <input
                                {...props}
                                placeholder="-"
                                style={{ width: "50px" }}
                                className="border border-gray-700 rounded-md aspect-square text-center  focus:outline-2 focus:outline-green-500"
                            />
                        )}
                        containerStyle={{
                            justifyContent: "space-between",
                            gap: "0 6px",
                        }}
                    />
                    <button type='submit' className="self-end text-white bg-black h-10 w-28 rounded-md hover:bg-[#00a264] transition-all duration-300">Verify</button>
                </form>
            </div>
        </div>
    </>
    )
}

export default VerifyEmail
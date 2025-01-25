import { useState } from 'react'
import OTPInput from 'react-otp-input'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    let data = location.state?.data;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.trim() === "") {
            return;
        }

        const toastId = toast.loading("verifying...");
        try {
            let res = await fetch("http://localhost:3000/auth/verifyOtp", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    otp: otp
                })
            });

            let result = await res.json();
            console.log(result);

            if (result.success) {
                toast.dismiss(toastId);
                navigate("/reset-password", { state: { data: data } });
            }
            else {
                toast.update(toastId, {render: "Invalid OTP", type: 'error'});
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

export default VerifyOtp

import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const ResetPassword = () => {

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const location = useLocation();
    let data = location.state?.data;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            // update the password
            try {
                let res = await fetch("http://localhost:3000/auth/resetPassword", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: data.email,
                        new_pass: formData.password
                    })
                })

                let result = await res.json();
                console.log(result);

                if (result.success) {
                    toast.success("Password updated successfully");
                    e.target.reset();

                    setTimeout(() => {
                        navigate('/');
                    }, 1500)
                }
                else {
                    toast.error("Something went wrong");
                    setTimeout(() => {
                        navigate('/');
                    }, 1500)
                }
            } catch (error) {
                console.log(error);
            }

            e.target.reset();
        }
    }

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="flex flex-col w-1/3 gap-y-6">
                <h1 className="text-3xl font-semibold">Reset Password</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-y-6 border border-gray-400 rounded-md px-12 py-6"
                >
                    <div>
                        <label className="relative">
                            <p className="text-lg">
                                New Password<span className="text-red-500">*</span>
                            </p>
                            <input
                                required
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                type={showPassword1 ? "text" : "password"}
                                placeholder="Enter new password"
                                className="w-full border border-gray-400 rounded-md p-2 mt-1"
                            />
                            <span className="absolute cursor-pointer translate-y-4 right-3">
                                {showPassword1 ?
                                    <FiEyeOff onClick={() => setShowPassword1(!showPassword1)} />
                                    : <FiEye onClick={() => setShowPassword1(!showPassword1)} />
                                }
                            </span>
                        </label>
                    </div>
                    <div>
                        <label className="relative">
                            <p className="text-lg">
                                Confirm Password<span className="text-red-500">*</span>
                            </p>
                            <input
                                required
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                type={showPassword2 ? "text" : "password"}
                                placeholder="Enter password to confirm"
                                className="w-full border border-gray-400 rounded-md p-2 mt-1"
                            />
                            <span className="absolute cursor-pointer translate-y-4 right-3">
                                {showPassword2 ?
                                    <FiEyeOff onClick={() => setShowPassword2(!showPassword2)} />
                                    : <FiEye onClick={() => setShowPassword2(!showPassword2)} />
                                }
                            </span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white py-2 rounded-md hover:bg-[#00a264] transition-all duration-300"
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
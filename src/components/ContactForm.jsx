import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    })

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const loginToastId = toast.loading("Message sending...");

        try {
            const response = await fetch('http://localhost:3000/contact-us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                }),
            });

            const data = await response.json();
            if (data.status == 200) {
                toast.update(loginToastId, {
                    render: "Thank you for reaching out!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
            else {
                toast.update(loginToastId, {
                    render: "Something went wrong",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
            
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: '',
            });
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <div className="border border-gray-400  rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
            <h1 className="text-2xl sm:text-4xl leading-10 font-semibold text-richblack-5">
                Got a Idea? We&apos;ve got the skills. Let&apos;s team up
            </h1>
            <p className="">
                Tell us more about yourself and what you&apos;re got in mind.
            </p>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-6 my-2'>
                        <div className='w-full'>
                            <label>
                                <p>First Name<span className='text-red-500'>*</span></p>
                                <input
                                    required
                                    type='text'
                                    name='firstName'
                                    placeholder='Enter first name'
                                    value={formData.firstName}
                                    onChange={handleOnChange}
                                    className='border-2 rounded-md w-full border-gray-400 p-2 mb-2'
                                />
                            </label>
                        </div>
                        <div className='w-full'>
                            <label>
                                <p>Last Name<span className='text-red-500'>*</span></p>
                                <input
                                    required
                                    type='text'
                                    name='lastName'
                                    placeholder='Enter last name'
                                    value={formData.lastName}
                                    onChange={handleOnChange}
                                    className='border-2 rounded-md w-full border-gray-400 p-2 mb-2'
                                />
                            </label>
                        </div>
                    </div>
                    <div className='my-2'>
                        <label>
                            <p>Email <span className='text-red-500'>*</span></p>
                            <input
                                required
                                type='email'
                                name='email'
                                placeholder='Enter email address'
                                value={formData.email}
                                onChange={handleOnChange}
                                className='border-2 rounded-md w-full border-gray-400 p-2 mb-2'
                            />
                        </label>
                    </div>
                    <div className='my-2'>
                        <label>
                            <p>Phone Number <span className='text-red-500'>*</span></p>
                            <input
                                required
                                type='number'
                                name='phone'
                                placeholder='Enter phone number'
                                value={formData.phone}
                                onChange={handleOnChange}
                                className='border-2 rounded-md w-full border-gray-400 p-2 mb-2'
                            />
                        </label>
                    </div>
                    <div className='my-2'>
                        <label>
                            <p>Message <span className='text-red-500'>*</span></p>
                            <textarea
                                required
                                name='message'
                                placeholder='Enter your message here'
                                cols={10}
                                rows={7}
                                value={formData.message}
                                onChange={handleOnChange}
                                className='form-style border-2 rounded-md w-full border-gray-400 p-2 mb-2'
                            />
                        </label>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-black text-white text-lg font-semibold hover:bg-[#00a264] transition-all duration-300 py-3 px-4 rounded-md '
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactForm
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPost = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef()

    const [imageFile, setImageFile] = useState("https://res.cloudinary.com/dpsb0ysde/image/upload/v1721747774/job-search_cbwggp.png")
    const [imagePreview, setImagePreview] = useState(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            setImageFile(file)
            ReadFile(file)
        }
    }

    const ReadFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
    }

    const onSubmit = async (data) => {

        let formData = new FormData();
        // Append other data fields
        for (const key in data) {
            formData.append(key, data[key]);
        }
        
        // Conditionally append the file object if it exists
        if (imageFile != "https://res.cloudinary.com/dpsb0ysde/image/upload/v1721747774/job-search_cbwggp.png") {
            formData.append("post_image", imageFile);
        }

        let res = await fetch("http://localhost:3000/post/createPost", {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        let data2 = await res.json()
        console.log("Data:",data2)

        toast.success('Job Posted', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setImageFile("https://res.cloudinary.com/dpsb0ysde/image/upload/v1721747774/job-search_cbwggp.png")
        setImagePreview(null)
        reset();
    }

    return (
        <>
            <ToastContainer />

            <div className='w-[calc(100vw-10rem)] overflow-y-auto'>
                <div className=' mx-auto w-10/12 '>
                    <h1 className="text-3xl font-semibold mb-10">Add Post</h1>
                    <main className=' bg-gray-100 border border-gray-400 rounded-lg'>
                        <div className=' flex gap-x-10 items-center justify-center px-10 py-8 '>
                            <img className=' size-28 rounded-full' src={imagePreview || imageFile} alt="" />
                            <div className=' flex flex-col gap-y-4 items-center'>
                                <h1 className=' text-xl text-black font-semibold'>Upload picture</h1>
                                <div className=' flex gap-4 '>
                                    <input type="file"
                                        className=' hidden'
                                        accept="image/png, image/jpeg, image/jpg, image/gif"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                    />
                                    <button onClick={() => { fileInputRef.current.click() }} className=' bg-gray-400 text-black py-2 px-4 rounded-md'>Select</button>
                                </div>
                            </div>
                        </div>

                        <div className=" pb-10">
                            <form onSubmit={handleSubmit(onSubmit)} action="">
                                <div className="w-10/12 mx-auto flex flex-col gap-y-3">
                                    <h2 className="text-xl text-black font-semibold ">Job Information</h2>
                                    <div className="w-full">
                                        <label>
                                            <p>Job Title</p>
                                            <input type="text" className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                                                {...register("title", { required: true })}
                                            />
                                        </label>
                                    </div>
                                    <div className="w-full">
                                        <label>
                                            <p>Job Description</p>
                                            <textarea className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                                                rows={7}
                                                name="about"
                                                maxLength={1500}
                                                {...register("description", { required: true })}
                                            />
                                        </label>
                                    </div>
                                    <div className="flex gap-4 self-end">
                                        <button onClick={() => { navigate("/myprofile") }} className="px-4 py-2 bg-gray-400 rounded-md">Cancel</button>
                                        <button disabled={isSubmitting} type="submit" value='Submit' className=" flex items-center gap-x-1 px-4 py-2 bg-black hover:bg-[#00a264] text-white rounded-md transition-all duration-300">Post<span className="material-symbols-outlined">post_add</span></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AddPost

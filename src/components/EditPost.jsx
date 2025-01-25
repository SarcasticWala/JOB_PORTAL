import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const { postId } = useParams();

    const [post, setPost] = useState({});

    const [form, setForm] = useState({
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl
    })

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                console.log(postId)
                let res = await fetch(`http://localhost:3000/post/getPostDetails`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        post_id: postId
                    })
                });
                res = await res.json();
                console.log(res)
                let data = res.post_details
                setPost(data)
                setForm({ ...form, title: data.title, description: data.description, imageUrl: data.imageUrl })
            }
        }

        fetchPost();
    }, [])

    const [imagePreview, setImagePreview] = useState(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handlePdfChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setForm({ ...form, [e.target.name]: file })
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(form)

        const newForm = new FormData();
        newForm.append('title', form.title)
        newForm.append('description', form.description)
        newForm.append('post_image', form.imageUrl)
        newForm.append('post_id', postId)

        console.log(newForm)
        let res = await fetch(`http://localhost:3000/post/editPost`, {
            method: "PUT",
            credentials: 'include',
            body: newForm
        });
        
        res = await res.json();
        console.log(res)

        toast.success('Job Edited', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <>
            <ToastContainer />

            <div className='w-[calc(100vw-10rem)] overflow-y-auto'>
                <div className=' mx-auto w-10/12 '>
                    <h1 className="text-3xl font-semibold mb-10">Edit Post</h1>
                    <main className=' bg-gray-100 border border-gray-400 rounded-lg'>
                        <div className=' flex gap-x-10 items-center justify-center px-10 py-8 '>
                            <img className=' size-28 rounded-full' src={imagePreview || form.imageUrl} alt="" />
                            <div className=' flex flex-col gap-y-4 items-center'>
                                <h1 className=' text-xl text-black font-semibold'>Change picture</h1>
                                <div className=' flex gap-4 '>
                                    <input type="file"
                                        className=' hidden'
                                        accept="image/png, image/jpeg, image/jpg, image/gif"
                                        ref={fileInputRef} name='imageUrl'
                                        onChange={handlePdfChange}
                                    />
                                    <button onClick={() => { fileInputRef.current.click() }} className=' bg-gray-400 text-black py-2 px-4 rounded-md'>Select</button>
                                </div>
                            </div>
                        </div>

                        <div className=" pb-10">
                            <form onSubmit={handleSubmit} action="">
                                <div className="w-10/12 mx-auto flex flex-col gap-y-3">
                                    <h2 className="text-xl text-black font-semibold ">Job Information</h2>
                                    <div className="w-full">
                                        <label>
                                            <p>Job Title</p>
                                            <input name='title' type="text" className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                                                value={form.title}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="w-full">
                                        <label>
                                            <p>Job Description</p>
                                            <textarea className="border border-gray-400 rounded-md mt-2 p-2 w-full"
                                                rows={7}
                                                name="description"
                                                maxLength={1500}
                                                value={form.description}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="flex gap-4 self-end">
                                        <button onClick={() => { navigate("/myposts") }} className="px-4 py-2 bg-gray-400 rounded-md">Cancel</button>
                                        <button type="submit" value='Submit' className=" flex items-center gap-x-1 px-4 py-2 bg-black hover:bg-[#00a264] text-white rounded-md transition-all duration-300">Edit<span className="material-symbols-outlined">edit_square</span></button>
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

export default EditPost

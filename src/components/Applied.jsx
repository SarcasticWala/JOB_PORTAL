import { useEffect, useState } from 'react';
import job_picture from '../assets/images/job-search.png';

const Applied = () => {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
      const getApplyPosts = async () => {
        let res = await fetch("http://localhost:3000/profile/getApplyPost", {
          method: "GET",
          credentials: 'include',
        });

        res = await res.json();
        console.log(res)
        setAllPosts(res.user.apply)
      }
      getApplyPosts()
    },[])

    return (
        <div>
            <div className='w-1/2 mx-auto'>
                <h1 className='text-3xl font-semibold my-8'>Applied Job Posts</h1>
                <div>
                    {allPosts.map((post, index) => {
                        return (
                            <div key={index} className= {`my-10 mx-auto p-4 mb-1 cursor-pointer border-2 hover:bg-[#f4f4f4] rounded-md`} >
                                <div className=' flex items-center gap-x-3 mb-2'>
                                    <img className='size-16 rounded-full' src={post.imageUrl} alt="" />
                                    <div className=' text-xl font-semibold'>{post.title}</div>
                                </div>
                                <div>{post.description}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Applied
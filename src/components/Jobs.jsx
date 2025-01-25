import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Jobs = () => {

  const [allPosts, setAllPosts] = useState({})

  const [currPost, setCurrPost] = useState()

  const user = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);

  async function getPosts() {
    let res = await fetch("http://localhost:3000/post/getAllPost", {
      method: "GET",
      credentials: 'include',
    });

    res = await res.json();
    setAllPosts(res);
    console.log(res)
    // Logic by ChatGpt
    setCurrPost(prevPost => res.All_post_details.find(post => post._id === prevPost?._id) || res.All_post_details[0]);
  }

  useEffect(() => {
    getPosts();
  },[])

  const handleApply = async () => {
    if(!token) {
      toast.error("Please login to apply for a job");
      return;
    }
    if(user.accountType === 'hr') {
      toast.error("HRs can't apply for jobs");
      return;
    }
    let res = await fetch("http://localhost:3000/post/applyPost", {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id: currPost._id
      })
    });

    let data = await res.json();
    console.log(data)

    getPosts();
  }

  return (
    <>
      <div className=' flex justify-center gap-x-6 py-10'>
        <div className=' w-1/4 max-h-[80vh] overflow-y-scroll pr-1'>
          {allPosts.All_post_details?.map((post, i) => {
            return (
              <div onClick={()=>{setCurrPost(post)}} key={i} className= {`${post==currPost?" border-[#ededed] rounded-lg":" border-white border-b-[#ededed]"} p-4 mb-1 cursor-pointer border-2 hover:bg-[#f4f4f4]`} >
                <div className=' flex items-center gap-x-3 mb-2'>
                  <img className=' size-12 rounded-full' src={post.imageUrl} alt="" />
                  <div className=' text-lg font-medium'>{post.title}</div>
                </div>
                <div>{post.description.split(" ").slice(0, 10).join(" ")}...</div>
              </div>
            )
          })}
        </div>

        <div className=' w-1/2 max-h-[80vh] flex items-center gap-x-6 p-8 border-2 border-b-[#ededed] rounded-lg'>
          <img className=' size-12 rounded-full self-start' src={currPost?.imageUrl} alt="" />
          <div className=' self-start'>
            <div className=' flex items-center justify-between gap-6 mb-5'>
              <div className=' text-3xl font-semibold'>{currPost?.title}</div>
              <button 
                className=' bg-[#4cd681] hover:bg-[#00a264] text-black hover:text-white font-medium py-2 px-4 rounded-md'
                onClick={handleApply}
                disabled={currPost?.applied?.includes(user?._id)} 
              >
                {currPost?.applied?.includes(user?._id) ? "Applied" : "Apply" }
              </button>
            </div>
            <div className=' overflow-y-auto max-h-[60vh]'>
              <div className=' text-lg font-semibold mb-2'>Job Description</div>
              <div>{currPost?.description}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Jobs

import { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MyPosts = () => {
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      let res = await fetch("http://localhost:3000/profile/getMyPosts", {
        method: "GET",
        credentials: 'include',
      });

      res = await res.json();
      let data = res.user.posts
      console.log(res.user.posts)
      setAllPosts(data)
    }

    getPosts();

  }, [])

  async function deletePost(id) {
    let confirm = window.confirm("Are you sure you want to delete this post?")
    if (!confirm) return;

    const toastId = toast.loading('Deleting Post...');
    try {
      let res = await fetch(`http://localhost:3000/post/deletePost`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: id
        })
      });

      res = await res.json();
      let data = res.user.posts
      setAllPosts(data)
      toast.update(toastId, {
        render: "Post Deleted",
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Error Deleting Post",
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
      console.log(error.message)
    }
  }

  const navigate = useNavigate()
  return (
    <div className='w-full'>
      <div className='w-[70%] py-10 mx-auto'>
        <h1 className='text-3xl font-semibold'>My Posts</h1>
        <div className=''>
          {allPosts.length ? (
            allPosts.map((post, index) => {
              return (
                <div key={index} className='px-5 py-6 my-14 border border-gray-400 rounded-lg'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <img src={post.imageUrl} className='h-16 w-16' />
                      <h2 className='font-semibold text-xl '>{post.title}</h2>
                    </div>
                    <div className='flex items-center gap-4'>
                      <button
                        onClick={() => { navigate(`/myposts/appliedUsers/${post._id}`) }}
                        className='bg-black text-white hover:bg-[#00a264]  px-3 py-1 rounded-md transition-all duration-300'>
                        Applied Users
                      </button>
                      <button onClick={() => { navigate(`/myposts/editPost/${post._id}`) }}>
                        <FaRegEdit color='green' size={28} />
                      </button>
                      <button onClick={async () => await deletePost(post._id)}><MdDeleteOutline color='red' size={28} /></button>
                    </div>
                  </div>
                  <div className='mt-5 mx-auto w-[95%]'>
                    <h2 className='font-semibold text-lg mb-2'>Job Description</h2>
                    <p className=' max-h-[250px] overflow-auto'>{post.description}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='px-5 py-6 my-14 text-center text-xl font-semibold border border-gray-400 rounded-lg'>
              You don't have any posts till now!
            </div>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default MyPosts
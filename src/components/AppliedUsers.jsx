import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AppliedUsers = () => {

  const [appliedUsers, setAppliedUsers] = useState([])
  console.log(appliedUsers)
  const { postId } = useParams();

  useEffect(() => {
    const getAppliedUsers = async () => {
      let res = await fetch("http://localhost:3000/profile/getAppliedUsers", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId
        })
      });

      res = await res.json();
      console.log(res);
      setAppliedUsers(res?.post?.applied);
    }

    getAppliedUsers();
  }, [])

  return ( // TODO: add pno user apllied till now in post 
    <div>
      {
        appliedUsers.length ? (
          appliedUsers.map((user, index) => (
            <div key={index} className='mx-auto my-8 w-1/2 border border-gray-400 rounded-lg py-6'>
              <div className='flex flex-col items-center'>
                <img src={user.image} alt="user" className='w-20 h-20 rounded-full mx-auto' />
                <p className='font-semibold text-xl mt-2'>{user.firstName + " " + user.lastName}</p>
                <p className='italic'>{user.email}</p>
                {
                  user.additionalDetails.contact &&
                  <p className='font-semibold mt-1'>Contact Number : <span> </span>
                    <span className='font-normal'>{user.additionalDetails.contact}</span></p>
                }
                {
                  user.additionalDetails.gender &&
                  <p className='font-semibold mt-1'>Gender : <span> </span>
                    <span className='font-normal'>{user.additionalDetails.gender}</span></p>
                }
                {
                  user.additionalDetails.DOB &&
                  <p className='font-semibold mt-1'>Date of Birth :<span> </span>
                    <span className='font-normal'>{user.additionalDetails.DOB}</span></p>
                }
                <a href={`${user.resume}`} target='_blank' className='bg-black mt-4 px-4 py-2 text-white hover:bg-[#00a264] rounded-md transition-all duration-300'>View Resume</a>
              </div>
              <div className='w-10/12 mx-auto'>
                <div className='bg-gray-300 h-[1px] my-6'></div>
                <p className='font-semibold text-lg'>About</p>
                <p>{user.additionalDetails.about}</p>
              </div>
            </div>
          ))
        ): (
          <div className='mx-auto text-center text-xl font-semibold my-8 w-1/2 border border-gray-400 rounded-lg py-6'>
            No user applied till Now!
          </div>
        )
      }
    </div>
  )
}

export default AppliedUsers